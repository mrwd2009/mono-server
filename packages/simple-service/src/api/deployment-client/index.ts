import Router from '@koa/router';
import * as ctrl from './controller';

const router = new Router({
  prefix: '/deployment-client',
});

router.post('/service/run', ...ctrl.runServiceHandler);

export default router;
