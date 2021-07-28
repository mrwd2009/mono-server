import Router from '@koa/router';
import * as ctrl from './controller';
import { middleware } from '../../config';
const {
  passport: {
    jwtAuth,
  }
} = middleware;

const router = new Router({
  prefix: '/system',
});

router.get('/info', jwtAuth, ctrl.getInfoCtrl);

export default router;