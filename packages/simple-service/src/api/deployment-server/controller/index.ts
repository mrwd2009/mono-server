import cookie from 'cookie';
import config from '../../../config/config';
import { GatewayCtrlArray } from '../../../type';
import { validator, validatePagination } from '../../../middleware';
import { deploymentModel } from '../model';

export const createServiceHandler: GatewayCtrlArray = [
  validator(Schema => Schema.object({
    name: Schema.string(),
    category: Schema.string(),
    description: Schema.string(),
    command: Schema.string(),
  })),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.createService(context.mergedParams));
  }
];

export const getServiceListHandler: GatewayCtrlArray = [
  validatePagination(),
  async (context) => {
    const result = await deploymentModel.getServiceList(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  }
];

export const getServiceAgentListHandler: GatewayCtrlArray = [
  validatePagination(),
  async (context) => {
    const result = await deploymentModel.getServiceAgentList(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  }
];

export const assignAgentHandler: GatewayCtrlArray = [
  validator(Schema => Schema.object({
    serviceId: Schema.number().integer(),
    agentIds: Schema.array().items(Schema.number().integer()),
    action: Schema.string().valid('add', 'remove'),
  })),
  async (context) => {
    const result = await deploymentModel.assignAgent(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  }
];

export const createAgentHandler: GatewayCtrlArray = [
  validator(Schema => Schema.object({
    name: Schema.string(),
    ip: Schema.string().ip({
      version: ['ipv4']
    }),
  })),
  async (context) => {
    const cookieObj = cookie.parse(context.request.header.cookie as string);
    console.log(cookieObj[config.jwt.cookieKey]);
    context.gateway?.sendJSON?.(await deploymentModel.createAgent(context.mergedParams));
  }
];

export const getAgentListHandler: GatewayCtrlArray = [
  validatePagination(),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.getAgentList(context.mergedParams));
  }
];

export const getLogListHandler: GatewayCtrlArray = [
  validatePagination(),
  async (context) => {
    context.gateway?.sendJSON?.(await deploymentModel.getLogList(context.mergedParams))
  }
]