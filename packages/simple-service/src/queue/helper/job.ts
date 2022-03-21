/* eslint-disable @typescript-eslint/no-explicit-any */
import { Job, Queue, JobOptions } from 'bull';
import { QueueGetter } from './common';

// export interface GetOptions {
//   persistent: boolean;
//   idle: number;
// }

const persistentCache: Record<string, () => Queue<any>> = {};
// interface TempQueue {
//   getQueue: () => Queue<any>,
//   idle: number,
//   timer?: NodeJS.Timeout,
// }
// const tempCache: Record<string, TempQueue> = {};

export const getQueue = (name: string) => {
  // const opts = _.merge({ persistent: true, idle: 10000 }, options);
  // if (opts.persistent) {
  if (!persistentCache[name]) {
    persistentCache[name] = new QueueGetter(name).getQueue;
  }
  return persistentCache[name]();
  // }

  // let tempQueue: TempQueue;
  // if (!tempCache[name]) {
  //   tempQueue = {
  //     getQueue: new QueueGetter(name).getQueue,
  //     idle: opts.idle,
  //   };
  //   tempQueue.timer = setTimeout(() => {
  //     delete tempCache[name];
  //   }, tempQueue.idle);
  // }
};

export const enqueue = async (name: string, payload: any, jobOptions?: JobOptions): Promise<Job> => {
  const queue = getQueue(name);
  return await queue.add(payload, jobOptions);
};
