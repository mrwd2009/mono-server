import Koa from 'koa';
import { GatewayMiddleware } from '../../type';

export const mergedParams: GatewayMiddleware = async (context, next) => {
  const {
    query,
    request: {
      body,
    },
    params,
  } = context;
  context.mergedParams = {
    ...params,
    ...query,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(body as any),
  };
  await next();
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(mergedParams);
};

export default initialize;