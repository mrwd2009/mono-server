import Koa from 'koa';
import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import { GatewayMiddleware } from '../../type';
import config from '../../config';

export const measure: GatewayMiddleware = async (context, next) => {
  const start = dayjs().valueOf();
  context.state.requestId = uuidV4();
  // const profileTag = `${context.state.requestId} ${context.method}:${context.originalUrl}`;
  let hasError = false;
  try {
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
        url = `\x1b[38;2;255;77;79m${context.method} ${context.originalUrl} ${durationStr}\x1b[0m`
      } else {
        url = `\x1b[38;2;82;196;26m${context.method} ${context.originalUrl} ${durationStr}\x1b[0m`;
      }
      console.info(`\x1b[38;2;0;204;204mResponse Time(${context.state.requestId}): \x1b[0m ${url}`);
    }
  }
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(measure);
};

export default initialize;