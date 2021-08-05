import Router from '@koa/router';

const router = new Router({
  prefix: '/deployment-server',
});

router.post('/service/list');
router.post('service/assign');
router.get('service/agent-list');
router.post('/agent');
router.post('/agent/list');
router.post('/log/list');

export default router;
