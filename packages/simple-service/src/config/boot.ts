import Koa from 'koa';
import http from 'http';
import initializer from './initializer';
import middleware from './middleware';
import dispatch from './dispatch';
import { ip } from '../lib/util';
import config from './config';

const boot = async (app: Koa, port: number | string ): Promise<void> => {
  await initializer();
  await middleware(app);
  await dispatch(app);
  await new Promise((resolve, reject) => {
    const server = http.createServer(app.callback())
      .listen(port, () => {
        console.log('\u001b[38;5;28m--------------------- API Serivce ---------------------\u001b[0m')
        console.log('The http endpoints are as following.\n')
        console.log(`\u001b[30;1mLocal:\u001b[0m            http://localhost:\u001b[30;1m${port}\u001b[0m/`);
        if (config.isDev) {
          console.log(`\u001b[30;1mOn Your Network:\u001b[0m  http://${ip.getLocalIPs()[0]}:\u001b[30;1m${port}\u001b[0m/`);
        }
        console.log('\n');
        resolve(port);
      });
    server.on('error', (error: Error): void => {
      reject(error);
      if (error) {
        console.error(error);
      }
    });
  });
};

export default boot;

