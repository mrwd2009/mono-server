import 'dotenv/config';
import cluster, { fork, isWorker } from 'cluster';
import { cpus } from 'os';
import config from './config/config';
import Application from './application';
import { initialize as initMonitor } from './lib/monitor/prometheus';
import { registerCleanupHandler } from './lib/signal/handler';
const {
  logger: { ipc },
} = config;

const initialize = async () => {
  await initMonitor('cluster', true);
  if (isWorker) {
    const app = new Application();
    await app.initialize(true);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let logger: any = null;
  // if log server is created, we need to skip requiring 'primary'.
  // Because we don't want log server and master process to manage log together.
  if (!ipc.enabled) {
    // logger will receive logs generated from worker.
    // the master process manages log lifecyle like rotation.
    logger = require('./lib/logger/primary').default;
  }

  const size = process.env.CLUSTER_WORKERS || cpus().length;
  const createWorker = () => {
    fork().on('error', (error) => {
      logger?.error(error.message, { response: error });
      console.error(error.stack);
    });
  };
  for (let i = 0; i < size; i++) {
    createWorker();
  }
  let destroy = false;
  cluster.on('exit', (worker, code, signal) => {
    const msg = `API(exit): worker(${worker.process.pid}) died with code(${code}) and signal(${signal})`;
    logger?.error(msg);
    console.error(msg);
    if (destroy) {
      return;
    }
    createWorker();
  });

  registerCleanupHandler(async () => {
    await new Promise((resolve) => {
      destroy = true;
      resolve(true);
    });
  });
};

initialize();
