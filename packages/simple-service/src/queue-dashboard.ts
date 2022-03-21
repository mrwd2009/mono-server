import 'dotenv/config';
import Koa from 'koa';
import config from './config/config';
import { ip } from './lib/util';
import { initialize as dashboardInit } from './queue/dashboard';
const port = process.env.QUEUE_DASHBOARD_PORT ? parseInt(process.env.QUEUE_DASHBOARD_PORT) : 5379;

const initialize = async () => {
  const app = new Koa();
  await dashboardInit(app);
  app.use((context) => {
    context.redirect(config.queue.dashboard.basePath);
  });
  app
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
};

initialize();
