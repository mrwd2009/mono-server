import RedisClient, { Redis } from 'ioredis';
import { createHash } from 'crypto';
import config from '../../config';
import { DataError } from '../error';

export interface MemoizedDataProvider {
  cachedKey: string,
  value: () => Promise<unknown>,
  id: (value?: unknown) => string, // used to generate hash for this value
}

export interface MemoizedData {
  get: () => Promise<unknown>
}

export class RedisFactory {
  private redisClient: Redis | undefined;
  private cachedStore: Map<string, {id: string, value: unknown}> = new Map();

  constructor(private url: string, private prefix: string, private expired: number) {
  }

  private getClient(): Redis {
    if (this.redisClient) {
      return this.redisClient;
    }
    this.redisClient = new RedisClient(this.url, {
      keyPrefix: this.prefix,
    });
    return this.redisClient;
  }

  async get(key: string): Promise<string> {
    if (config.isDev) {
      throw new DataError('Value is not found(development).');
    }
    const client = this.getClient();
    const val = await client.get(key);
    if (val === null) {
      throw new DataError('Value is not found.');
    }
    return val;
  }

  async set(key: string, data: string, expired: number = this.expired): Promise<void> {
    if (config.isDev) {
      return;
    }
    const client = this.getClient();
    await client.set(key, data, 'EX', expired);
    return;
  }

  async del(key: string ): Promise<void> {
    if (config.isDev) {
      return;
    }
    const client = this.getClient();
    await client.del(key);
  }

  async getMemoizedData(provider: MemoizedDataProvider, expired: number = this.expired): Promise<MemoizedData> {
    if (config.isDev) {
      // always return a new value from db or other source
      return {
        get: provider.value,
      };
    }
    const get = async (): Promise<unknown> => {
      const cache = this.cachedStore.get(provider.cachedKey);
      let localId = cache?.id;
      const client = this.getClient();
      if (localId) {
        const redisId = await client.hget(provider.cachedKey, 'id');
        // has same hash id, value is not changed, return previous value
        if (localId === redisId) {
          return cache?.value;
        }
      } else {
        const redisId = await client.hget(provider.cachedKey, 'id');
        // updated by other client, just read it and store it locally
        if (redisId) {
          const redisValue = await client.hget(provider.cachedKey, 'value');
          if (redisValue) {
            const parsedValue = JSON.parse(redisValue);
            this.cachedStore.set(provider.cachedKey, {
              id: redisId,
              value: parsedValue,
            });
            return parsedValue;
          }
        }
      }
      // get value, compute hash, then cache it in local and remote
      const localValue = await provider.value();
      const rawId = provider.id(localValue);
      const hash = createHash('sha256');
      hash.update(rawId);
      localId = hash.digest('hex');
      this.cachedStore.set(provider.cachedKey, {
        id: localId,
        value: localValue,
      });
      await client.multi()
        .hset(provider.cachedKey, 'id', localId, 'value', JSON.stringify(localValue))
        .expire(provider.cachedKey, expired)
        .exec();
      return localValue;
    };
    
    return {
      get,
    };
  }

  async close(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }
}

export default RedisFactory;