import { Middleware } from '@koa/router';
import { GatewayError } from '../lib/error';
import config from '../config/config';

interface Options {
  error?: string,
}
export const showConfusedError = (options?: Options): Middleware => {
  const error = options?.error;
  return async (context, next) => {
    try {
      await next();
    } catch (_error) {
      if (config.isDev) {
        throw _error;
      }
      const i18n = context.i18n;
      if (error && i18n.exists(error)) {
        throw new GatewayError(i18n.t(error));
      } else {
        throw new GatewayError(i18n.t('common.internalError'))
      }
    }
  };
};

export default showConfusedError;