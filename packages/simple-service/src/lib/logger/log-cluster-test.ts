// This file is just for test
import { fork, isWorker } from 'cluster';
import logger from './index';
if (!isWorker) {
  fork();
  fork();
} else {
  logger.error('from worker error');
  logger.info('from worker info');
  logger.error('from worker error with response', { response: new Error('error obj') });
}
