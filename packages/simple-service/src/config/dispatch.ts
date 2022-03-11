import Koa from 'koa';
import Router from '@koa/router';
import { passport } from './middleware';
import deploymentClient from '../api/deployment-client';
import deploymentServer from '../api/deployment-server';
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
    .use(deploymentServer.routes())
    .use(deploymentClient.routes())
    .use(systemRouter.routes());

  app
    .use(publicRouter.routes())
    .use(authCheckingRouter.routes());
};

export default dispatch;