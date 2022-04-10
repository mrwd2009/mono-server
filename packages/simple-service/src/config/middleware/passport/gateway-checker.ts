import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import util from '../../../lib/util';
const {
  gateway: {
    models: { User, UserToken },
  },
} = appDBs;
import { Checker, registerChecker } from "./checker";

const checker: Checker = async (payload, token) => {
  if (payload?.type === 'user') {
    const user = await User.findOne({
      attributes: ['id', 'email'],
      where: {
        id: payload.sub,
      },
      include: {
        model: UserToken,
        attributes: ['id'],
        where: {
          user_id:  payload.sub,
          signature: util.getJwtTokenSignature(token),
          status: 'enabled',
        },
      },
    });

    if (!user || !user.UserTokens?.length) {
      throw new AuthError('Invalid or expired token.');
    }
    return {
      passed: true,
      entity: {
        id: user.id,
        email: user.email,
      },
      afterChecker: async () => {
        console.log('after gateway')
        return;
      },
    }
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;