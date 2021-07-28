import Koa from 'koa';
import cors from '@koa/cors';
import endsWith from 'lodash/endsWith';
import some from 'lodash/some';
import config from '../config';

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(cors({
    origin: (context) => {
      const origin = context.get('Origin')
      if (config.isDev) {
        return origin;
      }
      if (some(config.cors.allowedDomain, domain => endsWith(origin, domain))) {
        return origin;
      }
      throw new Error(`Origin(${origin}) is not allowed to access current resouce.`);
    },
    allowHeaders: ['Content-Type', 'responseType', 'X-Requested-With', 'App-Locale'],
    credentials: true,
  }));
};

export default initialize;