import Queue, { Queue as QueueType, QueueOptions } from 'bull';
import Redis from 'ioredis';
import memoizeOne from 'memoize-one';
import config from '../../config/config';

const getClientRedis = memoizeOne(() => {
  return new Redis(config.queue.redis.url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
});

const getSubscriberRedis = memoizeOne(() => {
  return new Redis(config.queue.redis.url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
});

const getDefaultRedis = () => {
  return new Redis(config.queue.redis.url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
};

//https://github.com/OptimalBits/bull/blob/master/PATTERNS.md#reusing-redis-connections
export const createQueue = (name: string, options: QueueOptions = {}): QueueType => {
  const createClient = (type: string) => {
    switch (type) {
      case 'client': {
        return getClientRedis();
      }
      case 'subscriber': {
        return getSubscriberRedis();
      }
      default: {
        return getDefaultRedis();
      }
    }
  };
  return new Queue(name, {
    ...config.queue.options,
    ...options,
    createClient: createClient as QueueOptions['createClient'],
  });
};

export class QueueGetter {
  private cache?: QueueType;

  constructor(public name: string) {}

  getQueue = (): QueueType => {
    // lazy creating
    if (!this.cache) {
      this.cache = createQueue(this.name);
    }
    return this.cache;
  };
}
