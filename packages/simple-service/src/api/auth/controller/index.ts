import { Middleware } from '@koa/router';
import { userModel } from '../model';
import config from '../../../config';
import { validator, validateEmailDomains, showConfusedError } from '../../../middleware';

export const login: Array<Middleware> = [
  showConfusedError({ error: 'auth.confusedError' }),
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email(),
      password: Schema.string(),
    })
  ),
  validateEmailDomains(),
  async (context) => {
    const { token, user } = await userModel.login(context.mergedParams);
    context.cookies.set(config.jwt.cookieKey, token, {
      httpOnly: true,
      maxAge: config.jwt.expireHour * 3600 * 1000,
      signed: true,
    });
    context.gateway!.sendJSON!({ user });
  },
];

export const register: Array<Middleware> = [
  showConfusedError({ error: 'auth.confusedError' }),
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email(),
      displayName: Schema.string(),
      password: Schema.string(),
    })
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.register(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
]

export const logout: Middleware = async (context) => {
  context.cookies.set(config.jwt.cookieKey, '', { signed: true });
  context.body = {
    success: true,
  };
};
