import { Middleware } from '@koa/router';
import { userModel } from '../model';
import config from '../../../config';
import { validator, validateEmailDomains, showConfusedError } from '../../../middleware';
import { getJwtTokenFromReq } from '../../../lib/util/common';

const maxStrLen = config.auth.maxStrLen;

export const loginHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.confusedError' }),
  validator((Joi) =>
    Joi.object({
      email: Joi.string().email().max(maxStrLen),
      password: Joi.string().max(maxStrLen),
      client: Joi.object({
        deviceType: Joi.string().optional(),
        os: Joi.string().optional(),
        browser: Joi.string().optional(),
        timeZone: Joi.string().optional(),
      }),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    const { email, password, client } = context.mergedParams;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      email,
      password,
      client,
      ip: context.ip,
      userAgent: context.headers['user-agent'],
      referer: context.headers['referer'],
      origin: context.headers['origin'],
    };

    const { token, email: receivedEmail, reset } = await userModel.login(params, context.i18n);
    if (reset) {
      return context.gateway!.sendJSON!({
        reset: true,
        email: receivedEmail,
        token,
      });
    }

    context.cookies.set(config.jwt.cookieKey, token, {
      httpOnly: true,
      maxAge: config.jwt.expireHour * 3600 * 1000,
      signed: true,
    });
    context.gateway!.sendJSON!({ reset: false, email: receivedEmail });
  },
];

export const registerHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.confusedError' }),
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email().max(maxStrLen),
      displayName: Schema.string().max(maxStrLen),
      password: Schema.string().max(maxStrLen),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.register(
      {
        ...context.mergedParams,
        origin: context.headers['origin'],
      },
      context.i18n,
    );
    context.gateway!.sendJSON!({ done: true });
  },
];

export const forgotPasswordHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.confusedError' }),
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email().max(maxStrLen),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    const origin = context.headers['origin'];
    await userModel.forgotPassword(
      {
        email: context.mergedParams.email,
        origin,
      },
      context.i18n,
    );
    context.gateway!.sendJSON!({ done: true });
  },
];

export const resetPasswordHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.invalidToken' }),
  validator((Schema) =>
    Schema.object({
      password: Schema.string().max(maxStrLen),
      token: Schema.string(),
    }),
  ),
  async (context) => {
    await userModel.resetPassword(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const unlockUserHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.invalidToken' }),
  validator((Schema) =>
    Schema.object({
      token: Schema.string(),
    }),
  ),
  async (context) => {
    await userModel.unlockUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const confirmUserHandler: Array<Middleware> = [
  showConfusedError({ error: 'auth.invalidToken' }),
  validator((Schema) =>
    Schema.object({
      token: Schema.string(),
    }),
  ),
  async (context) => {
    await userModel.confirmUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const logoutHandler: Middleware = async (context) => {
  const token = getJwtTokenFromReq(context.req);
  await userModel.logoutUser(context.state.user.id, token, context.i18n);
  context.cookies.set(config.jwt.cookieKey, '', { signed: true });
  context.body = {
    success: true,
  };
};
