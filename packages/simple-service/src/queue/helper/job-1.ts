import { Job } from 'bull';
import { QueueGetter } from './common';

export const getQueue = new QueueGetter('job-1').getQueue;

export const enqueue = async (): Promise<Job> => {
  const queue = getQueue();
  return await queue.add({
    name: 'job-1',
  });
}