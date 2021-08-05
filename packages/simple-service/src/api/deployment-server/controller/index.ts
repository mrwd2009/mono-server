import { GatewayRouterContext, GatewayRouterReturn } from '../../../type';
import { validator, validatePagination } from '../../../middleware';
import { deploymentModel } from '../model';

export const getServiceListCtrl = [
  validatePagination(),
  async (context: GatewayRouterContext): GatewayRouterReturn => {
    const result = await deploymentModel.getServiceList(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  }
];

export const assignAgentCtrl = [
  validator(Schema => Schema.object({
    serviceId: Schema.number().integer(),
    agentIds: Schema.array().items(Schema.number().integer()),
  })),
  async (context: GatewayRouterContext): GatewayRouterReturn => {
    const result = await deploymentModel.assignAgent(context.mergedParams);
    context.gateway?.sendJSON?.(result);
  }
]