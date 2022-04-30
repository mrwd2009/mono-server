import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/system',
});

router.get('/info', ctrl.getInfoHandler);

router.post('/user/list', ...ctrl.getUserListHandler);
router.post('/user', ...ctrl.createUserHandler);
router.put('/user', ...ctrl.editUserHandler);
router.delete('/user', ...ctrl.deleteUserHandler);

router.post('/user/history/list', ...ctrl.getUserLoginHistoryListHandler);

router.get('/permissions', ctrl.getPermissionsHandler);
router.post('/permission', ...ctrl.createPermissionHandler);
router.put('/permission', ...ctrl.updatePermissionHandler);
router.put('/permission/reparent', ...ctrl.reparentPermissionHandler);
router.delete('/permission', ...ctrl.deletePermissionHandler);

router.get('/roles', ctrl.getRolesHandler);
router.post('/role', ...ctrl.createRoleHandler);
router.put('/role', ...ctrl.updateRoleHandler);
router.put('/role/reparent', ...ctrl.reparentRoleHandler);
router.delete('/role', ...ctrl.deleteRoleHandler);
router.get('/role/assigned-permissions', ...ctrl.getAssignedPermissionsHandler);
router.put('/role/assigned-permissions', ...ctrl.assignPermissionsHandler);

registerRouter(router);
