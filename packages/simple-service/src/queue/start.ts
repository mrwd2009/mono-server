import cluster, { fork, isWorker } from 'cluster';
import { cpus } from 'os';
import config from '../config/config';
import initializer from '../config/initializer';
import { initialize as initMonitor } from '../lib/monitor/prometheus';

const initialize = async () => {
  await initializer();

  if (config.isDev) {
    await initMonitor('queue');
    require('./job');
    return;
  }

  await initMonitor('queue', true);

  if (isWorker) {
    require('./job');
    return;
  }

  const logger = require('../lib/logger').default;
  const size = process.env.QUEUE_WORKERS || cpus().length;
  const createWorker = () => {
    fork().on('error', (error) => {
      logger.error(error.message, { response: error });
    });
  };

  for (let i = 0; i < size; i++) {
    createWorker();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.error(`Queue(exit): worker(${worker.process.pid}) died with code(${code}) and signal(${signal})`);
    createWorker();
  });
};

initialize();
