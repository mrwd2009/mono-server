import Koa, { Middleware } from 'koa';
import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import config from '../../config';
import logger from '../../lib/logger';

declare module 'koa' {
  interface DefaultState {
    requestId?: string;
  }
}

export const measure: Middleware = async (context, next) => {
  const start = dayjs().valueOf();
  context.state.requestId = uuidV4();
  let hasError = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let profiler: any = null;
  try {
    if (!config.isDev) {
      profiler = logger.startTimer();
    }
    await next();
  } catch (error) {
    hasError = true;
    throw error;
  } finally {
    const end = dayjs().valueOf();
    const duration = end - start;
    // for development mode
    if (config.isDev) {
      let durationStr = '';
      // highlight long request
      if (duration > 200) {
        durationStr = `\x1b[38;2;205;0;205m(${duration}ms)\x1b[0m`;
      } else {
        durationStr = `(${duration}ms)`;
      }

      let url = '';
      // hilight error request
      if (hasError) {
        url = `\x1b[38;2;255;77;79m${context.method} ${context.originalUrl} ${durationStr}\x1b[0m`;
      } else {
        url = `\x1b[38;2;82;196;26m${context.method} ${context.originalUrl} ${durationStr}\x1b[0m`;
      }
      console.info(`\x1b[38;2;0;204;204mResponse Time(${context.state.requestId}): \x1b[0m ${url}\n`);
    }

    profiler?.done({
      level: 'info',
      message: `${context.method}${context.originalUrl}`,
      trackId: context.state.requestId,
      user: context.state.user?.email || 'ananymity',
    });
  }
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(measure);
};

export default initialize;
