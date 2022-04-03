/* eslint-disable @typescript-eslint/no-explicit-any */
import { Job, Queue, JobOptions } from 'bull';
import { QueueGetter } from './common';

// must define the job name at here, in order to make sure typing correctly
type JobName = 'job-1' | 'job-2' | 'auth-confirmation-email' | 'auth-forgot-email' | 'auth-lock-email';

const persistentCache: Record<string, () => Queue<any>> = {};

export const getQueue = (name: JobName) => {
  if (!persistentCache[name]) {
    persistentCache[name] = new QueueGetter(name).getQueue;
  }
  return persistentCache[name]();
};

export const enqueue = async (name: JobName, payload: any, jobOptions?: JobOptions): Promise<Job> => {
  const queue = getQueue(name);
  return await queue.add(payload, jobOptions);
};
