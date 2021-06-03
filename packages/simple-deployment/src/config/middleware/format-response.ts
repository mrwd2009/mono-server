import Koa from 'koa';
import { GatewayRouterContext, GatewayMiddleware } from '../../type';

export const formatResponse: GatewayMiddleware = async (context: GatewayRouterContext, next) => {
  context.gateway = context.gateway || {};
  // format response
  context.gateway.sendJSON = (result) => {
    context.status = 200;
    context.body = {
      meta: {
        code: 200,
      },
      data: result,
    }
  };
  await next();
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(formatResponse);
};

export default initialize;