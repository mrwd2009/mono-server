import Koa from 'koa';
import Router from '@koa/router';
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
};

export default dispatch;