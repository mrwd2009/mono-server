import Router from '@koa/router';

const router = new Router({
  prefix: '/deployment-client',
});

router.post('service/run')

export default router;
