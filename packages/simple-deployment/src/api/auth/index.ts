import Router, { RouterContext } from '@koa/router';
import * as ctrl from './controller';
import { middleware } from '../../config';
const {
  passport: {
    jwtAuth,
  }
} = middleware;

const router = new Router({
  prefix: '/auth',
});

router.post('/login', ctrl.login);
router.post('/logout', jwtAuth, ctrl.logout);

export default router;