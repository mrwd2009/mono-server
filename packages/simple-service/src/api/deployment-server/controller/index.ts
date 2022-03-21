import { Middleware } from '@koa/router';
import cookie from 'cookie';
import config from '../../../config/config';
import { validator, validatePagination } from '../../../middleware';
import { deploymentModel } from '../model';

export const createServiceHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      name: Schema.string(),
      category: Schema.string(),
      description: Schema.string(),
      command: Schema.string(),
    }),
  ),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.createService(context.mergedParams));
  },
];

export const getServiceListHandler: Array<Middleware> = [
  validatePagination(),
  async (context) => {
    const result = await deploymentModel.getServiceList(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const getServiceAgentListHandler: Array<Middleware> = [
  validatePagination(),
  async (context) => {
    const result = await deploymentModel.getServiceAgentList(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const assignAgentHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      serviceId: Schema.number().integer(),
      agentIds: Schema.array().items(Schema.number().integer()),
      action: Schema.string().valid('add', 'remove'),
    }),
  ),
  async (context) => {
    const result = await deploymentModel.assignAgent(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  },
];

export const createAgentHandler: Array<Middleware> = [
  validator((Schema) =>
    Schema.object({
      name: Schema.string(),
      ip: Schema.string().ip({
        version: ['ipv4'],
      }),
    }),
  ),
  async (context) => {
    // const cookieObj = cookie.parse(context.request.header.cookie as string);
    context.gateway?.sendJSON?.(await deploymentModel.createAgent(context.mergedParams));
  },
];

export const getAgentListHandler: Array<Middleware> = [
  validatePagination(),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.getAgentList(context.mergedParams));
  },
];

export const getLogListHandler: Array<Middleware> = [
  validatePagination(),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.getLogList(context.mergedParams));
  },
];
