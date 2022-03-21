import Koa, { Middleware } from 'koa';

declare module 'koa' {
  interface DefaultContext {
    gateway?: {
      sendJSON?: (result: unknown) => void;
    };
  }
}

export const formatResponse: Middleware = async (context, next) => {
  context.gateway = context.gateway || {};
  // format response
  context.gateway.sendJSON = (result) => {
    context.status = 200;
    context.body = {
      meta: {
        code: 200,
      },
      data: result,
    };
  };
  await next();
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(formatResponse);
};

export default initialize;
