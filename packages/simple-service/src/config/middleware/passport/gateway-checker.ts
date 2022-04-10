import dayjs from 'dayjs';
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
        attributes: ['id', 'expired_at'],
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
    const tokenObj = user.UserTokens[0];
    return {
      passed: true,
      entity: {
        id: user.id,
        email: user.email,
      },
      afterChecker: async () => {
        // todo, extend active token automatically
        // tokenObj.expired_at
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