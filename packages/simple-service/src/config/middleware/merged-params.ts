import Koa, { Middleware } from 'koa';

declare module 'koa' {
  interface DefaultContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergedParams?: any;
  }
}

export const mergedParams: Middleware = async (context, next) => {
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