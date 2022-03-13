import Router from '@koa/router';
import * as ctrl from './controller';
import { registerPublicRouter } from '../../config/router';


const router = new Router({
  prefix: '/public',
});

router.get('/health-checking', ctrl.healthCheckingCtrl);

registerPublicRouter(router);