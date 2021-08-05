import Router from '@koa/router';
import * as ctrl from './controller';

const router = new Router({
  prefix: '/public',
});

router.get('/health-checking', ctrl.healthCheckingCtrl);

export default router;