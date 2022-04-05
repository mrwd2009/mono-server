import Queue, { Queue as QueueType, QueueOptions } from 'bull';
import Redis from 'ioredis';
import memoizeOne from 'memoize-one';
import config from '../../config/config';
import { registerCleanupHandler, removeCleanupHandler } from '../../lib/signal/handler';

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

  constructor(public name: string) {
    registerCleanupHandler(this.handleSignalClose);
  }

  handleSignalClose = async () => {
    if (this.cache) {
      await this.cache.close();
      this.cache = undefined;
    }
  };

  getQueue = (): QueueType => {
    // lazy creating
    if (!this.cache) {
      this.cache = createQueue(this.name);
    }
    return this.cache;
  };

  async close(): Promise<void> {
    if (this.cache) {
      removeCleanupHandler(this.handleSignalClose);
      await this.cache.close();
      this.cache = undefined;
    }
  }
}
