import { getQueue } from '../helper/job-2';
import processor from './processor/job-2';

const queue = getQueue();
queue.process(processor);