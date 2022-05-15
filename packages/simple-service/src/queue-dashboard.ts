import 'dotenv/config';
import Koa from 'koa';
import http from 'http';
import config from './config/config';
import depsInit from './config/initializer';
import { ip } from './lib/util';
import { initialize as dashboardInit } from './queue/dashboard';
import { initialize as initMonitor } from './lib/monitor/prometheus';
import { registerCleanupHandler } from './lib/signal/handler';
const port = process.env.QUEUE_DASHBOARD_PORT ? parseInt(process.env.QUEUE_DASHBOARD_PORT) : 5379;

const initialize = async () => {
  const app = new Koa();
  await depsInit();
  await dashboardInit(app);
  app.use((context) => {
    context.redirect(config.queue.dashboard.basePath);
  });
  const server = http.createServer(app.callback());
  server
    .listen(port, () => {
      console.log('\u001b[38;5;28m--------------------- Queue Dashboard ---------------------\u001b[0m');
      console.log('The queue dashboard endpoints are as following.\n');
      console.log(`\u001b[30;1mLocal:\u001b[0m            http://localhost:\u001b[30;1m${port}\u001b[0m/`);
      if (config.isDev) {
        console.log(
          `\u001b[30;1mOn Your Network:\u001b[0m  http://${ip.getLocalIPs()[0]}:\u001b[30;1m${port}\u001b[0m/`,
        );
      }
      console.log('\n');
    })
    .on('error', (error: Error) => {
      console.error(error);
    });
  
  await initMonitor('queue-dashboard');
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
};

initialize();
