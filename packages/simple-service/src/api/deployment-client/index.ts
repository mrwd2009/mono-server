import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/deployment-client',
});

router.post('/service/run', ...ctrl.runServiceHandler);

registerRouter(router);
