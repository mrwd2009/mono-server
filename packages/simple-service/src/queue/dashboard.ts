import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { KoaAdapter } from '@bull-board/koa';
import Koa from 'koa';
import { getQueue } from './helper/job';
import config from '../config/config';

const getQueues = () => {
  return [
    new BullAdapter(getQueue('auth-forgot-email')),
    new BullAdapter(getQueue('auth-confirmation-email')),
    new BullAdapter(getQueue('auth-lock-email')),
  ];
};

export const initialize = async (app: Koa): Promise<Koa> => {
  const adapter = new KoaAdapter();
  createBullBoard({
    queues: getQueues(),
    serverAdapter: adapter,
  });
  adapter.setBasePath(config.queue.dashboard.basePath);
  app.use(adapter.registerPlugin());
  return app;
};
