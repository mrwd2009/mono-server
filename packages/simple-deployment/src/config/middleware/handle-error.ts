import Koa from 'koa';
import { GatewayRouterContext, GatewayMiddleware } from '../../type';
import config from '../../config';

export const handleError: GatewayMiddleware = async (context: GatewayRouterContext, next) => {
  try {
    await next();
  } catch (error) {
    if (config.isDev) {
      console.error(error);
    }
    switch (error.code) {
      case 'AuthError': {
        context.status = 401;
        context.body = {
          meta: {
            code: 401,
            message: error.message,
          },
          data: null,
        };
        break;
      }
      case 'BackendError': {
        context.status = 500;
        context.body = {
          meta: {
            code: 500,
            message: config.isDev ? error.message : error.publicMessage,
          },
          data: null,
        };
        break;
      }
      case 'DataError':
      case 'GatewayError':
      case 'LogicError':
      case 'ParamError': {
        context.status = 500;
        context.body = {
          meta: {
            code: 500,
            message: error.message,
          },
          data: null,
        }
        break;
      }
      default: {
        context.status = 501;
        context.body = {
          meta: {
            code: 501,
            message: config.isDev ? error.message : 'Internal Error',
          },
          data: null,
        }
      }
    }
  }
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(handleError);
};

export default initialize;