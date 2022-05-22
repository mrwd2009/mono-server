import { DefaultContext } from 'koa';
import dayjs from 'dayjs';
import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import util from '../../../lib/util';
import { mainRedis } from '../../../lib/redis';
import config from '../../config';
const {
  gateway: {
    models: { User, UserToken },
  },
} = appDBs;
import { Checker, registerChecker, CheckerResult, extendSession, CachedUser } from './checker';

const checker: Checker = async (payload, token): Promise<CheckerResult> => {
  if (payload?.type === 'user') {
    let user: CachedUser = {};
    const cacheKey = `passport-${payload.type}-${payload.sub}`;
    try {
      const cachedStr = await mainRedis.get(cacheKey);
      user = JSON.parse(cachedStr);
    } catch {
      const userRecord = await User.findOne({
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

      if (!userRecord || !userRecord.UserTokens?.length) {
        throw new AuthError('Invalid or expired token.');
      }
      user.id = userRecord.id;
      user.email = userRecord.email;
      user.tokenId = userRecord.UserTokens[0].id;
      user.tokenExpiredAt = dayjs.utc(userRecord.UserTokens[0].expired_at).format();

      await mainRedis.set(cacheKey, JSON.stringify(user), config.systemCache.passportExpired);
    }
    return {
      passed: true,
      entity: {
        id: user.id,
        type: 'user',
        email: user.email,
      },
      afterChecker: async (context: DefaultContext) => {
        await extendSession(
          context,
          {
            id: user.tokenId!,
            expiredAt: user.tokenExpiredAt!,
          },
          UserToken,
        );
      },
    };
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
