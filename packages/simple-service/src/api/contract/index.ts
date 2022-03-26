import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/contract',
});

router.get('/list', ctrl.getContractListHandler);
router.get('/saved-list', ctrl.getSavedNodeListHandler);
router.post('/tree', ...ctrl.getContractTreeHandler);
router.delete('/tree', ...ctrl.deleteContractTreeHandler);
router.get('/tree/version-list', ...ctrl.getContractVersionsHandler);
router.get('/tree/node', ...ctrl.getContractNodeHandler);
router.post('/tree/node', ...ctrl.createContractNodeHandler);
router.put('/tree/node', ...ctrl.updateContractNodeHandler);
router.delete('/tree/node', ...ctrl.deleteContractNodeHandler);
router.post('/tree/node/reparent', ...ctrl.reparentContractTreeNodeHandler);
router.post('/tree/node/reusable', ...ctrl.saveContractTreeReusableNodeHandler);

registerRouter(router);