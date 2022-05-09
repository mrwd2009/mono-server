import { DefaultContext } from 'koa';
import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import util from '../../../lib/util';
const {
  gateway: {
    models: { OAuth2User, OAuth2UserToken },
  },
} = appDBs;
import { Checker, registerChecker, CheckerResult, extendSession } from './checker';

const checker: Checker = async (payload, token): Promise<CheckerResult> => {
  if (payload?.type === 'oauth2') {
    const user = await OAuth2User.findOne({
      attributes: ['id', 'email'],
      where: {
        id: payload.sub,
      },
      include: {
        model: OAuth2UserToken,
        attributes: ['id', 'expired_at'],
        where: {
          user_id: payload.sub,
          signature: util.getJwtTokenSignature(token),
          status: 'enabled',
        },
      },
    });

    if (!user || !user.OAuth2UserTokens?.length) {
      throw new AuthError('Invalid or expired token.');
    }
    const tokenObj = user.OAuth2UserTokens[0];
    return {
      passed: true,
      entity: {
        id: user.id,
        type: 'oauth2',
        email: user.email,
      },
      afterChecker: async (context: DefaultContext) => {
        await extendSession(context, tokenObj, OAuth2UserToken);
      },
    };
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
