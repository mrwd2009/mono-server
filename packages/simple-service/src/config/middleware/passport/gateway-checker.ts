import { DefaultContext } from 'koa';
import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import util from '../../../lib/util';
const {
  gateway: {
    models: { User, UserToken },
  },
} = appDBs;
import { Checker, registerChecker, CheckerResult, extendSession } from './checker';

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
        await extendSession(context, tokenObj, UserToken);
      },
    };
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
