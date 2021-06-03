import Koa from 'koa';
import { GatewayMiddleware } from '../../type';

export const formatResponse: GatewayMiddleware = async (context, next) => {
  context.gateway = context.gateway || {};
  await next();
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(formatResponse);
};

export default initialize;