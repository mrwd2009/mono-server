import { job } from '../helper';
import processor from './processor/job-2';

const queue = job.getQueue('job-2');
queue.process(processor);

export { queue };
