import Koa from 'koa';
import Router from '@koa/router';
import config from './config';
import deployRubyRouter from '../api/deploy-ruby';
import authRouter from '../api/auth';
import systemRouter from '../api/system';

const apiRouter = new Router({
  prefix: '/api',
});
const dispatch = async (app: Koa): Promise<void> => {
  apiRouter
    .use(authRouter.routes())
    .use(deployRubyRouter.routes())
    .use(systemRouter.routes());
  app.use(apiRouter.routes());
  // add queue dashboard routes
  if (config.queue.dashboard.enabled) {
    await require('../queue/dashboard').initialize(app);
  }
};

export default dispatch;