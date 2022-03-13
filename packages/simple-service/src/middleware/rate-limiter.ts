import { Middleware } from 'koa';
import { RateLimiterRedis, RateLimiterMemory, RateLimiterAbstract } from 'rate-limiter-flexible';
import { mainRedis } from '../lib/redis';
import config from '../config/config';

const {
  rateLimiter: opts,
} = config;

const rateLimiter = (): Middleware => {
  let limiter: RateLimiterAbstract;

  if (config.isDev) {
    limiter = new RateLimiterMemory({
      points: opts.points,
      duration: opts.duration,
    });
  } else {
    limiter = new RateLimiterRedis({
      storeClient: mainRedis.getClient(),
      keyPrefix: opts.keyPrefix,
      points: opts.points,
      duration: opts.duration,
    });
  }

  return async (ctx, next) => {
    try {
      let uuid: string = ctx.ip;
      if (ctx.state.user?.email) {
        uuid = ctx.state.user?.email;
      }
      uuid = `${uuid}-${ctx.method}-${ctx._matchedRoute}`;
      await limiter.consume(uuid);
    } catch {
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

export default rateLimiter;