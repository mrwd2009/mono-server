import Koa from 'koa';
import cors from '@koa/cors';
import endsWith from 'lodash/endsWith';
import some from 'lodash/some';
import { URL } from 'url';
import config from '../config';

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(cors({
    origin: (context) => {
      const origin = context.get('Origin')
      if (config.isDev) {
        return origin;
      }
      const url = new URL(origin);
      if (some(config.cors.allowedDomain, domain => endsWith(url.hostname, domain))) {
        return origin;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error(`Origin(${origin}) is not allowed to access current service.`);
      error.status = 403;
      error.expose = true;
      throw error;
    },
    allowHeaders: ['Content-Type', 'responseType', 'X-Requested-With', 'App-Locale'],
    credentials: true,
  }));
};

export default initialize;