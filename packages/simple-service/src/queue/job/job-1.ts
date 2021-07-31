import { getQueue } from '../helper/job-1';
import processor from './processor/job-1';
import logger from '../../lib/logger';

logger.info('test from job 1');
const queue = getQueue();
queue.process(processor);