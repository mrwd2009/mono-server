import { job } from '../helper';
import processor from './processor/job-1';
import logger from '../../lib/logger';

const queue = job.getQueue('job-1');
queue.process(processor);

export default queue;
