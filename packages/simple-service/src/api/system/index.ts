import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';
import { rbac } from '../../config/middleware';

const router = new Router({
  prefix: '/system',
});

router.get('/info', ctrl.getInfoHandler);
router.get('/user/avatar', ctrl.getUserAvatarHandler);
router.put('/user/profile', rbac.generalW, ...ctrl.saveUserProfileHandler);

router.post('/user/list', rbac.adminR, ...ctrl.getUserListHandler);
router.post('/user', rbac.adminW, ...ctrl.createUserHandler);
router.put('/user', rbac.adminW, ...ctrl.editUserHandler);
router.delete('/user', rbac.adminW, ...ctrl.deleteUserHandler);

router.post('/oauth2-user/list', rbac.adminR, ...ctrl.getOAuth2UserListHandler);
router.put('/oauth2-user', rbac.adminW, ...ctrl.editOAuth2UserHandler);

router.post('/user/history/list', rbac.advancedR, ...ctrl.getUserLoginHistoryListHandler);

router.get('/permissions', rbac.adminR, ctrl.getPermissionsHandler);
router.post('/permission', rbac.adminW, ...ctrl.createPermissionHandler);
router.put('/permission', rbac.adminW, ...ctrl.updatePermissionHandler);
router.put('/permission/reparent', rbac.adminW, ...ctrl.reparentPermissionHandler);
router.delete('/permission', rbac.adminW, ...ctrl.deletePermissionHandler);

router.get('/roles', rbac.adminR, ctrl.getRolesHandler);
router.get('/available-roles', rbac.adminR, ctrl.getAvailableRolesHandler);
router.post('/role', rbac.adminW, ...ctrl.createRoleHandler);
router.put('/role', rbac.adminW, ...ctrl.updateRoleHandler);
router.put('/role/reparent', rbac.adminW, ...ctrl.reparentRoleHandler);
router.delete('/role', rbac.adminW, ...ctrl.deleteRoleHandler);
router.get('/role/assigned-permissions', rbac.adminR, ...ctrl.getAssignedPermissionsHandler);
router.put('/role/assigned-permissions', rbac.adminW, ...ctrl.assignPermissionsHandler);

router.post('/log', rbac.adminR, ...ctrl.getLogsHandler);

registerRouter(router);
