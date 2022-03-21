import Router from '@koa/router';
import * as ctrl from './controller';
import { middleware } from '../../config';
import { registerPublicRouter } from '../../config/router';
const {
  passport: { jwtAuth },
} = middleware;

const router = new Router({
  prefix: '/auth',
});

router.post('/login', ...ctrl.login);
router.get('/logout', jwtAuth, ctrl.logout);

registerPublicRouter(router);
