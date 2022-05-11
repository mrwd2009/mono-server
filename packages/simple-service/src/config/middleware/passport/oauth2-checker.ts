import { DefaultContext } from 'koa';
import dayjs from 'dayjs';
import appDBs from '../../model/app';
import { AuthError } from '../../../lib/error';
import { mainRedis } from '../../../lib/redis';
import util from '../../../lib/util';
import config from '../../config';
const {
  gateway: {
    models: { OAuth2User, OAuth2UserToken },
  },
} = appDBs;
import { Checker, registerChecker, CheckerResult, extendSession, CachedUser } from './checker';

const checker: Checker = async (payload, token): Promise<CheckerResult> => {
  if (payload?.type === 'oauth2') {
    let user: CachedUser = {};
    const cacheKey = `passport-${payload.type}-${payload.sub}`;
    try {
      const cachedStr = await mainRedis.get(cacheKey);
      user = JSON.parse(cachedStr);
    } catch {
      const userRecord = await OAuth2User.findOne({
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
  
      if (!userRecord || !userRecord.OAuth2UserTokens?.length) {
        throw new AuthError('Invalid or expired token.');
      }
      user.id = userRecord.id;
      user.email = userRecord.email!;
      user.tokenId = userRecord.OAuth2UserTokens[0].id;
      user.tokenExpiredAt = dayjs.utc(userRecord.OAuth2UserTokens[0].expired_at).format();

      await mainRedis.set(cacheKey, JSON.stringify(user), config.systemCache.passportExpired);
    }

    return {
      passed: true,
      entity: {
        id: user.id,
        type: 'oauth2',
        email: user.email,
      },
      afterChecker: async (context: DefaultContext) => {
        await extendSession(context, {
          id: user.tokenId!,
          expiredAt: user.tokenExpiredAt!,
        }, OAuth2UserToken);
      },
    };
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
