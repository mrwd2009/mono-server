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

router.post('/login', ...ctrl.loginHandler);
// router.post('/register', ...ctrl.registerHandler);
// router.post('/forgot-password', ...ctrl.forgotPasswordHandler);
// router.post('/reset-password', ...ctrl.resetPasswordHandler);
// router.get('/unlock', ...ctrl.unlockUserHandler);
// router.get('/confirm', ...ctrl.confirmUserHandler);
router.get('/logout', jwtAuth, ctrl.logoutHandler);

router.get('/oauth2/authorize', ctrl.oauth2AuthorizeHandler);
router.get('/oauth2/callback', ctrl.oauth2CallbackHandler);

registerPublicRouter(router);
