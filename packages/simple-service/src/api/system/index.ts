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

registerRouter(router);
