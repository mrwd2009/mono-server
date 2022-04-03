import { Middleware } from '@koa/router';
import { systemModel, userModel } from '../model';
import config from '../../../config';
import { validator, validatePagination, validateEmailDomains } from '../../../middleware';

const maxStrLen = config.auth.maxStrLen;

export const getInfoHandler: Middleware = async (context) => {
  const info = await systemModel.getInfo(context.state);
  context.gateway!.sendJSON!(info);
};

export const getUserListHandler: Array<Middleware> = [
  validatePagination({
    sorter: ['created_at', 'updated_at'],
    format: {
      like: ['email'],
    },
  }),
  async (context) => {
    const result = await userModel.getUserList(context.validatorFormattedData);
    context.gateway?.sendJSON?.(result);
  },
];

export const createUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      email: Schema.string().email().max(maxStrLen),
      displayName: Schema.string().max(maxStrLen),
      password: Schema.string().max(maxStrLen),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.createUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const editUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      id: Schema.number().integer(),
      displayName: Schema.string().max(maxStrLen),
      password: Schema.string().max(maxStrLen),
    }),
  ),
  validateEmailDomains(),
  async (context) => {
    await userModel.editUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const deleteUserHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      id: Schema.number().integer(),
    }),
  ),
  async (context) => {
    await userModel.deleteUser(context.mergedParams, context.i18n);
    context.gateway!.sendJSON!({ done: true });
  },
];

export const getUserLoginHistoryListHandler: Array<Middleware> = [
  validatePagination({
    sorter: ['created_at', 'updated_at'],
    format: {
      like: ['email', 'ip'],
    },
  }),
  async (context) => {
    const result = await userModel.getUserLoginHistoryList(context.validatorFormattedData);
    context.gateway?.sendJSON?.(result);
  },
];
