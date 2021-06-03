import { Middleware } from '@koa/router';
import { userModel } from '../model';
import config from '../../../config';
import { GatewayController } from '../../../type';

export const login: GatewayController = async (context) => {
  const { token, username } = await userModel.login(context.request.body);
  context.cookies.set(config.jwt.cookieKey, token, {
    httpOnly: true,
    maxAge: config.jwt.expireHour * 3600 * 1000,
  });
  context.body = {
    username,
  };
};

export const logout: Middleware = async (context) => {
  context.cookies.set(config.jwt.cookieKey);
  context.body = {
    success: true,
  };
};

