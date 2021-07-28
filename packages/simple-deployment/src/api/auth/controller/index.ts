import { Middleware } from '@koa/router';
import { userModel } from '../model';
import config from '../../../config';
import { GatewayRouterContext } from '../../../type';
import { validator } from '../../../middleware';

export const login = [
  validator(Schema => Schema.object({
    Email: Schema.string(),
    Password: Schema.string(),
  })),
  async (context: GatewayRouterContext): Promise<void> => {
    const { token, user } = await userModel.login(context.request.body);
    context.cookies.set(config.jwt.cookieKey, token, {
      httpOnly: true,
      maxAge: config.jwt.expireHour * 3600 * 1000,
    });
    context.gateway!.sendJSON!({ user });
  }
];

export const logout: Middleware = async (context) => {
  context.cookies.set(config.jwt.cookieKey);
  context.body = {
    success: true,
  };
};

