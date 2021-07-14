const oldEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...oldEnv,
    NODE_ENV: 'production',
    JWT_SECRET: "test",
    TRACE_KNOWN_ERROR_IN_DEV: "false",
    MAIN_REDIS_URL: "redis://localhost:6379"
  };
});

afterAll(() => {
  process.env = oldEnv;
});

test('Simple get set del operation', async () => {
  const RedisFactory = require('./redis-factory').default;
  const config = require('../../config/config').default;
  const {
    redis: {
      main: {
        url,
        prefix,
        expired,
      },
    },
  } = config;
  const client = new RedisFactory(url, prefix, expired);
  try {
    const savedKey = 'jest-redis-factory-test-set';
    const savedVal = 'test';
    await client.set(savedKey, savedVal);
    const value = await client.get(savedKey);
    expect(value).toEqual(savedVal);
    await client.del(savedKey);
    try {
      await client.get(savedKey);
    } catch (error) {
      expect(error.message).toBe('Value is not found.');
    }
  } finally {
    await client.close();
  }
});

test('Test memoized data', async () => {
  const RedisFactory = require('./redis-factory').default;
  const config = require('../../config/config').default;
  const {
    redis: {
      main: {
        url,
        prefix,
        expired,
      },
    },
  } = config;
  const client = new RedisFactory(url, prefix, expired);
  try {
    const rawValue = {
      a: 1,
      b: 2,
    };
    const provider = {
      cachedKey: 'jest-redis-factory-test-memoized',
      value: async () => {
        return rawValue;
      },
      id: () => 'this is hash raw value',
    };
    await client.del('jest-redis-factory-test-memoized');
    const cachedData = await client.getMemoizedData(provider);
    const cachedValue1 = await cachedData.get();
    expect(cachedValue1 === rawValue).toBeTruthy();
    const cachedValue2 = await cachedData.get();
    expect(cachedValue2 === cachedValue1).toBeTruthy();
  } finally {
    await client.close();
  }
});

test('Dev simple get set del operation', async () => {
  process.env = {
    ...process.env,
    NODE_ENV: 'development',
  };
  const RedisFactory = require('./redis-factory').default;
  const config = require('../../config/config').default;
  const {
    redis: {
      main: {
        url,
        prefix,
        expired,
      },
    },
  } = config;
  const client = new RedisFactory(url, prefix, expired);
  try {
    const savedKey = 'jest-redis-factory-test-set';
    const savedVal = 'test';
    await client.set(savedKey, savedVal);
    let msg = '';
    try {
      await client.get(savedKey);
    } catch (error) {
      msg = error.message;
    }
    expect(msg).toBe('Value is not found(development).');
  } finally {
    await client.close();
  }
});

test('Dev test memoized data', async () => {
  process.env = {
    ...process.env,
    NODE_ENV: 'development',
  };
  const RedisFactory = require('./redis-factory').default;
  const config = require('../../config/config').default;
  const {
    redis: {
      main: {
        url,
        prefix,
        expired,
      },
    },
  } = config;
  const client = new RedisFactory(url, prefix, expired);
  try {
    const rawValue = {
      a: 1,
      b: 2,
    };
    const provider = {
      cachedKey: 'jest-redis-factory-test-memoized',
      value: async () => {
        return rawValue;
      },
      id: () => 'this is hash raw value',
    };
    await client.del('jest-redis-factory-test-memoized');
    const cachedData = await client.getMemoizedData(provider);
    const cachedValue = await cachedData.get();
    expect(cachedValue === rawValue).toBeTruthy();
    expect(cachedData.get === provider.value).toBeTruthy();
  } finally {
    await client.close();
  }
});