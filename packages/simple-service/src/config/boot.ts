import Koa from 'koa';
import http from 'http';
import initializer from './initializer';
import middleware from './middleware';
import dispatch from './dispatch';
import { ip } from '../lib/util';
import config from './config';
import logger from '../lib/logger';
import { registerCleanupHandler, registerInitPromise } from '../lib/signal/handler'; // register signal handler

// record all app level errors.
const catchUnhandledError = async (app: Koa) => {
  app.silent = true;
  app.on('error', (error: Error, ctx: Koa.Context) => {
    logger.error(error.message, { response: error, user: ctx?.state.user?.email || 'ananymity' });
  });
};
// in order to get user ip. Because of VPN, maybe it's not working as expected.
const trustProxy = async (app: Koa) => {
  app.proxy = true;
};

// to create signed cookie
const setCookieKeys = async (app: Koa) => {
  app.keys = config.cookie.keys;
};

const listen = async (app: Koa, port: number | string) => {
  const initStep = new Promise<Error | boolean>((resolve, reject) => {
    const server = http.createServer(app.callback()).listen(port, () => {
      if (config.isDev) {
        console.log('\u001b[38;5;28m--------------------- API Serivce ---------------------\u001b[0m');
        console.log('The http endpoints are as following.\n');
        console.log(`\u001b[30;1mLocal:\u001b[0m            http://localhost:\u001b[30;1m${port}\u001b[0m/`);
        console.log(
          `\u001b[30;1mOn Your Network:\u001b[0m  http://${ip.getLocalIPs()[0]}:\u001b[30;1m${port}\u001b[0m/`,
        );
        console.log('\n');
        resolve(true);
      } else {
        resolve(true);
      }
    });
    // gracefully close server
    registerCleanupHandler(async () => {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve(true);
        });
      });
    });
    server.on('error', (error: Error): void => {
      reject(error);
      if (error) {
        console.error(error);
      }
    });
  });
  registerInitPromise(initStep);
  await initStep;
};

const boot = async (app: Koa, port: number | string): Promise<void> => {
  await initializer();
  await middleware(app);
  await dispatch(app);
  await catchUnhandledError(app);
  await trustProxy(app);
  await setCookieKeys(app);
  await listen(app, port);
};

export default boot;
