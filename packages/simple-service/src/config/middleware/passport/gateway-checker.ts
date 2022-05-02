import dayjs from 'dayjs';
import { DefaultContext } from 'koa';
import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import util, { gatewayJwt } from '../../../lib/util';
const {
  gateway: {
    models: { User, UserToken },
    sequelize,
  },
} = appDBs;
import config from '../../config';
import { Checker, registerChecker, CheckerResult, canExtendSession } from './checker';

const extendSession = async (tokenId: number) => {
  return await sequelize.transaction(async (transaction) => {
    const tokenRecord = await UserToken.findOne({
      attributes: ['id', 'user_id', 'child_token_id'],
      where: {
        id: tokenId,
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!tokenRecord) {
      throw new AuthError('Invalid token.');
    }

    if (tokenRecord.child_token_id) {
      const createdRecord = await UserToken.findOne({
        attributes: ['id', 'token'],
        where: {
          id: tokenRecord.child_token_id,
        },
        transaction,
      });
      if (!createdRecord) {
        throw new AuthError('Invalid token.');
      }
      return createdRecord.token;
    }

    const newTokenRecord = await gatewayJwt.createToken({
      id: tokenRecord.user_id,
      type: 'user',
      transaction,
      UserToken,
    });

    newTokenRecord.parent_token_id = tokenRecord.id;
    tokenRecord.child_token_id = newTokenRecord.id;

    await Promise.all([tokenRecord.save({ transaction }), newTokenRecord.save({ transaction })]);

    return newTokenRecord.token;
  });
};

const checker: Checker = async (payload, token): Promise<CheckerResult> => {
  if (payload?.type === 'user') {
    const user = await User.findOne({
      attributes: ['id', 'email'],
      where: {
        id: payload.sub,
      },
      include: {
        model: UserToken,
        attributes: ['id', 'expired_at'],
        where: {
          user_id: payload.sub,
          signature: util.getJwtTokenSignature(token),
          status: 'enabled',
        },
      },
    });

    if (!user || !user.UserTokens?.length) {
      throw new AuthError('Invalid or expired token.');
    }
    const tokenObj = user.UserTokens[0];
    return {
      passed: true,
      entity: {
        id: user.id,
        type: 'user',
        email: user.email,
      },
      afterChecker: async (context: DefaultContext) => {
        if (!canExtendSession(context)) {
          return;
        }

        const extendDate = dayjs(tokenObj.expired_at).subtract(config.auth.session.restHour, 'hour');
        const currentDate = dayjs();
        if (currentDate.isAfter(extendDate)) {
          const newToken = await extendSession(tokenObj.id);
          context.cookies.set(config.jwt.cookieKey, newToken, {
            httpOnly: true,
            maxAge: config.jwt.expireHour * 3600 * 1000,
            signed: true,
          });
        }
      },
    };
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
