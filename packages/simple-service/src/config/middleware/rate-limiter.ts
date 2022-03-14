import Koa, { Middleware, Context } from 'koa';
import { RateLimiterRedis, RateLimiterMemory, RateLimiterAbstract, RateLimiterRes } from 'rate-limiter-flexible';
import { v4 as uuidV4 } from 'uuid';
import { mainRedis } from '../../lib/redis';
import config from '../config';

const {
  rateLimiter: opts,
} = config;

const rateLimiter = (): Middleware => {
  let ipLimiter: RateLimiterAbstract;
  let idLimiter: RateLimiterAbstract;

  if (config.isDev) {
    ipLimiter = new RateLimiterMemory({
      points: opts.byIP.points,
      duration: opts.byIP.duration,
    });
    idLimiter = new RateLimiterMemory({
      points: opts.byID.points,
      duration: opts.byID.duration,
    });
  } else {
    ipLimiter = new RateLimiterRedis({
      storeClient: mainRedis.getClient(),
      keyPrefix: `${opts.keyPrefix}-ip`,
      points: opts.byIP.points,
      duration: opts.byIP.duration,
    });
    idLimiter = new RateLimiterRedis({
      storeClient: mainRedis.getClient(),
      keyPrefix: `${opts.keyPrefix}-id`,
      points: opts.byID.points,
      duration: opts.byID.duration,
    });
  }

  const getLimiter = (fromCookie: boolean): RateLimiterAbstract => {
    console.log(`fromCookie${fromCookie}`)
    return fromCookie ? idLimiter : ipLimiter;
  };

  const updateLimitHeader = (info: RateLimiterRes, ctx: Context) => {
    // if it's not RateLimiterRes
    if (!('msBeforeNext' in info)) {
      return;
    }
    ctx.set('X-RateLimit-Limit', `${info.remainingPoints + info.consumedPoints}`);
    ctx.set('X-RateLimit-Remaining', `${info.remainingPoints}`);
    ctx.set('X-RateLimit-Reset', `${Math.ceil((new Date()).getTime() + info.msBeforeNext / 1000)}`);
  };

  return async (ctx, next) => {
    try {
      let uuid: string = ctx.ip;
      const cookieId = ctx.cookies.get(opts.cookieKey, { signed: true });
      let fromCookie = false;
      if (cookieId) {
        uuid = cookieId;
        fromCookie = true;
      } else {
        // add id to track api call
        ctx.cookies.set(opts.cookieKey, uuidV4(), { httpOnly: true, maxAge: opts.cookieExpiredDay * 24 * 3600 * 1000, signed: true });
      }
      const info = await getLimiter(fromCookie).consume(uuid);
      updateLimitHeader(info, ctx);
    } catch (error) {
      updateLimitHeader(error as RateLimiterRes, ctx);
      ctx.status = 429;
      ctx.body = {
        meta: {
          code: 429,
          message: 'Too many requests, please try again later.',
        },
      };
      return;
    }

    await next();
  }
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(rateLimiter());
};

export default initialize;