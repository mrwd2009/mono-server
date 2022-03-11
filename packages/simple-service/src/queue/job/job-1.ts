import { job } from '../helper';
import processor from './processor/job-1';
import logger from '../../lib/logger';

logger.info('test from job 1');
const queue = job.getQueue('job-1');
queue.process(processor);

export {
  queue
};