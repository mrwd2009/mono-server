import { Middleware } from '@koa/router';

export const healthCheckingCtrl: Middleware = async (context) => {
  context.gateway!.sendJSON!({
    status: 200
  });
};

