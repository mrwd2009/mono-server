import Router from '@koa/router';
import * as ctrl from './controller';

const router = new Router({
  prefix: '/system',
});

router.get('/info', ctrl.getInfoCtrl);

export default router;