import { Middleware } from '@koa/router';
import { userModel } from '../model';
import config from '../../../config';
import { validator } from '../../../middleware';

export const login: Array<Middleware> = [
  validator(Schema => Schema.object({
    Email: Schema.string(),
    Password: Schema.string(),
  })),
  async (context) => {
    const { token, user } = await userModel.login(context.request.body);
    context.cookies.set(config.jwt.cookieKey, token, {
      httpOnly: true,
      maxAge: config.jwt.expireHour * 3600 * 1000,
      signed: true,
    });
    context.gateway!.sendJSON!({ user });
  }
];

export const logout: Middleware = async (context) => {
  context.cookies.set(config.jwt.cookieKey, '', { signed: true });
  context.body = {
    success: true,
  };
};

