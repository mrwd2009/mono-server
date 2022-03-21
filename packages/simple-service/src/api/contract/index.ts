import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/contract',
});

router.get('/list', ctrl.getContractListHandler);

registerRouter(router);