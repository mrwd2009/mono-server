import { Job } from 'bull';
import { QueueGetter } from './common';

export const getQueue = new QueueGetter('job-2').getQueue;

export const enqueue = async (): Promise<Job> => {
  const queue = getQueue();
  return await queue.add({
    name: 'job-2',
  });
}