import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/contract',
});

router.get('/list', ctrl.getContractListHandler);
router.get('/saved-list', ctrl.getSavedNodeListHandler);
router.post('/tree', ...ctrl.getContractTreeHandler);
router.get('/tree/version-list', ...ctrl.getContractVersionsHandler);
router.get('/tree/node', ...ctrl.getContractNodeHandler);
router.put('/tree/node', ...ctrl.updateContractNodeHandler);

registerRouter(router);