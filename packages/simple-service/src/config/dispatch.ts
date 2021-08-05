import Koa from 'koa';
import Router from '@koa/router';
import config from './config';
import { passport } from './middleware';
import deployRubyRouter from '../api/deployment-client';
import authRouter from '../api/auth';
import systemRouter from '../api/system';
import openRouter from '../api/public';

const publicRouter = new Router({
  prefix: '/api',
});
const authCheckingRouter = new Router({
  prefix: '/api',
})
  .use(passport.jwtAuth);
const dispatch = async (app: Koa): Promise<void> => {
  publicRouter
    .use(authRouter.routes())
    .use(openRouter.routes());
  // including jwt checking logic
  authCheckingRouter
    .use(passport.jwtAuth)
    .use(deployRubyRouter.routes())
    .use(systemRouter.routes());

  app
    .use(publicRouter.routes())
    .use(authCheckingRouter.routes());
  
  // add queue dashboard routes
  if (config.queue.dashboard.enabled) {
    await require('../queue/dashboard').initialize(app);
  }
};

export default dispatch;