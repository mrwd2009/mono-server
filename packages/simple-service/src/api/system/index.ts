import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/system',
});

router.get('/info', ctrl.getInfoCtrl);

registerRouter(router);