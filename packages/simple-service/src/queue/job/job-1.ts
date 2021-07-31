import { getQueue } from '../helper/job-1';
import processor from './processor/job-1';

const queue = getQueue();
queue.process(processor);