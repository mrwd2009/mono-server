import Koa from 'koa';
import _ from 'lodash';
import { GatewayRouterContext, GatewayMiddleware } from '../../type';
import config from '../../config';

export const handleError: GatewayMiddleware = async (context: GatewayRouterContext, next) => {
  try {
    await next();
  } catch (error) {
    if (config.isDev) {
      console.error(`\x1b[38;2;255;77;79mError occurred at request: ${context.method} ${context.originalUrl}\x1b[0m`);
      if (!_.isEmpty(context.query)) {
        console.error(`\x1b[38;2;0;204;204mQuery Parameters:\x1b[0m`);
        console.error(`\x1b[38;2;82;196;26m${JSON.stringify(context.query, null, 2)}\x1b[0m`);
      }
      if (!_.isEmpty(context.request.body)) {
        console.error(`\x1b[38;2;0;204;204mPost Body:\x1b[0m`);
        console.error(`\x1b[38;2;82;196;26m${JSON.stringify(context.request.body, null, 2)}\x1b[0m`);
      }
      console.error(`\x1b[38;2;255;77;79m${error.stack}\x1b[0m`);
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