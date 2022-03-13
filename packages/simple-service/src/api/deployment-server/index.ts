import Router from '@koa/router';
import * as ctrl from './controller';
import { registerRouter } from '../../config/router';

const router = new Router({
  prefix: '/deployment-server',
});

router.post('/service', ...ctrl.createServiceHandler);
router.post('/service/list', ...ctrl.getServiceListHandler);
router.post('/service/agent-list', ...ctrl.getServiceAgentListHandler);
router.post('/service/assign', ...ctrl.assignAgentHandler);
router.post('/agent', ...ctrl.createAgentHandler);
router.post('/agent/list', ...ctrl.getAgentListHandler);
router.post('/log/list', ...ctrl.getLogListHandler);

registerRouter(router);
