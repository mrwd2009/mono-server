import { Middleware } from '@koa/router';
import _ from 'lodash';
import { ParamError } from '../../lib/error';
import config from '../../config/config';

interface Options {
  error?: string;
  field?: string;
}
export const validateEmailDomains = (options?: Options): Middleware => {
  const error = options?.error;
  const field = options?.field || 'email';
  return async (context, next) => {
    // if (config.isDev) {
    //   return await next();
    // }

    const email = context.mergedParams[field];
    const valid = _.some(config.auth.validEmailDomains, (allowed) => {
      return _.endsWith(email, allowed);
    });
    if (valid) {
      await next();
    } else {
      const i18n = context.i18n;
      if (error && i18n.exists(error)) {
        throw new ParamError(i18n.t(error));
      } else {
        throw new ParamError(i18n.t('common.invalidEmail'));
      }
    }
  };
};

export default validateEmailDomains;
