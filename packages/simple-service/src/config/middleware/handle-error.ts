import Koa, { Middleware } from 'koa';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import config from '../../config';
import * as lib from '../../lib';
import logger from '../../lib/logger';

const {
  error: { GatewayError },
} = lib;

export const handleError: Middleware = async (context, next) => {
  const start = (new Date()).getTime();
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    const trackId = context.state.requestId || uuidV4();
    if (config.isDev) {
      if (config.traceKnownErrorInDev || !(error instanceof GatewayError)) {
        console.error(`\x1b[38;2;255;77;79mError occurred at request: ${context.method} ${context.originalUrl}\x1b[0m`);
        if (!_.isEmpty(context.query)) {
          console.error(`\x1b[38;2;0;204;204mQuery Parameters:\x1b[0m`);
          console.error(`\x1b[38;2;82;196;26m${JSON.stringify(context.query, null, 2)}\x1b[0m`);
        }
        if (!_.isEmpty(context.request.body)) {
          console.error(`\x1b[38;2;0;204;204mPost Body:\x1b[0m`);
          console.error(`\x1b[38;2;82;196;26m${JSON.stringify(context.request.body, null, 2)}\x1b[0m`);
        }
        if (error.httpResponse?.data) {
          console.error(`\x1b[38;2;0;204;204mResponse:\x1b[0m`);
          console.error(`\x1b[38;2;82;196;26m${JSON.stringify(error.httpResponse.data, null, 2)}\x1b[0m`);
        }
        console.error(`\x1b[38;2;255;77;79m${error.stack}\x1b[0m\n`);
      }
    }

    if (!_.isEmpty(context.query)) {
      error.query = context.query;
    }
    if (!_.isEmpty(context.request.body)) {
      error.body = context.request.body;
    }
    const durationMs = (new Date()).getTime() - start;
    logger.error(error.message, { response: error, durationMs, trackId, user: context.state.user?.email || 'ananymity' });

    switch (error.code) {
      case 'AuthError': {
        context.status = 401;
        context.body = {
          meta: {
            code: 401,
            trackId,
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
            trackId,
            message: config.isDev ? error.message || error.publicMessage : error.publicMessage,
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
            trackId,
            message: error.message,
          },
          data: null,
        };
        break;
      }
      case 'ForbiddenError': {
        context.status = 403;
        context.body = {
          meta: {
            code: 403,
            trackId,
            message: error.message,
          },
          data: null,
        };
        break;
      }
      default: {
        context.status = 501;
        context.body = {
          meta: {
            code: 501,
            trackId,
            message: config.isDev ? error.message : 'Internal Error',
          },
          data: null,
        };
      }
    }
  }
};

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(handleError);
};

export default initialize;
