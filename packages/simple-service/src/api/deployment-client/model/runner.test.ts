import appDB from '../../../config/model/app';
import axios from 'axios';
import { running, runService, registerSelf } from './runner';
import config from '../../../config/config';
import { bashRunner, ip } from '../../../lib/util';
import logger from '../../../lib/logger';

const {
  gateway: {
    models: { Agent, Service, DeploymentLog },
  },
} = appDB;

jest.spyOn(logger, 'error').mockReturnThis();

test('run service successfully', async () => {
  Agent.findOne = jest.fn().mockResolvedValue({
    id: 1,
  });
  Service.findOne = jest.fn().mockResolvedValue({
    id: 2,
  });
  DeploymentLog.create = jest.fn().mockResolvedValue({});
  DeploymentLog.findOne = jest.fn().mockResolvedValue(null);
  await runService({ serviceId: 2, email: 'di@gridx.cn' });
  const log = DeploymentLog.create.mock.calls[0][0];
  expect(log.agent_id).toBe(1);
  expect(log.service_id).toBe(2);
  expect(log.email).toBe('di@gridx.cn');
});

test('run service without agent', async () => {
  Agent.findOne = jest.fn().mockResolvedValue(null);
  Service.findOne = jest.fn().mockResolvedValue({
    id: 2,
  });
  await expect(async () => await runService({ serviceId: 2, email: 'di@gridx.cn' })).rejects.toThrow('Agent(');
});

test('run service without servoce', async () => {
  Agent.findOne = jest.fn().mockResolvedValue({
    id: 1,
  });
  Service.findOne = jest.fn().mockResolvedValue(null);
  await expect(async () => await runService({ serviceId: 2, email: 'di@gridx.cn' })).rejects.toThrow('Service(2');
});

test('running successfully', async () => {
  const log = {
    update: jest.fn().mockResolvedValue({}),
    Service: {
      command: JSON.stringify([
        { type: 'git-pull', value: 'git pull USERNAME:PASSWORD' },
        { type: 'bash', value: 'cd .' },
        { type: 'test', value: 'test' },
      ]),
    },
  };
  const runner = {
    exec: jest.fn().mockImplementation((value) => {
      return Promise.resolve(value);
    }),
    close: jest.fn(),
  };
  config.github.username = 'di';
  config.github.password = 'pass';
  bashRunner.BashRunner = jest.fn().mockImplementation(() => {
    return runner;
  });
  DeploymentLog.findOne = jest.fn().mockResolvedValueOnce(log).mockResolvedValueOnce(null);
  await running();
  expect(log.update.mock.calls[0][0].status).toBe('in progress');
  expect(runner.exec.mock.calls[0][0]).toBe('git pull di:pass');
  expect(runner.exec.mock.calls[1][0]).toBe('cd .');
  expect(log.update.mock.calls[1][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass',
    percentage: Math.floor((1 / 3) * 100),
  });
  expect(log.update.mock.calls[2][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .',
    percentage: Math.floor((2 / 3) * 100),
  });
  expect(log.update.mock.calls[3][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .\ntest\n',
    percentage: 100,
    status: 'completed',
  });
});

test('running a command with stderrr', async () => {
  const log = {
    update: jest.fn().mockResolvedValue({}),
    Service: {
      command: JSON.stringify([
        { type: 'git-pull', value: 'git pull USERNAME:PASSWORD' },
        { type: 'bash', value: 'cd .' },
        { type: 'bash', value: 'test' },
      ]),
    },
  };
  let i = 0;
  const runner = {
    exec: jest.fn().mockImplementation((value) => {
      i++;
      if (i === 3) {
        return Promise.reject('failed');
      }
      return Promise.resolve(value);
    }),
    close: jest.fn(),
  };
  config.github.username = 'di';
  config.github.password = 'pass';
  bashRunner.BashRunner = jest.fn().mockImplementation(() => {
    return runner;
  });
  DeploymentLog.findOne = jest.fn().mockResolvedValueOnce(log).mockResolvedValueOnce(null);
  await running();
  expect(log.update.mock.calls[0][0].status).toBe('in progress');
  expect(runner.exec.mock.calls[0][0]).toBe('git pull di:pass');
  expect(runner.exec.mock.calls[1][0]).toBe('cd .');
  expect(log.update.mock.calls[1][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass',
    percentage: Math.floor((1 / 3) * 100),
  });
  expect(log.update.mock.calls[2][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .',
    percentage: Math.floor((2 / 3) * 100),
  });
  expect(log.update.mock.calls[3][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .\ntest\nfailed',
    percentage: 100,
    status: 'failed',
  });
});

test('running a command with error', async () => {
  const log = {
    update: jest.fn().mockResolvedValue({}),
    Service: {
      command: JSON.stringify([
        { type: 'git-pull', value: 'git pull USERNAME:PASSWORD' },
        { type: 'bash', value: 'cd .' },
        { type: 'bash', value: 'test' },
      ]),
    },
  };
  let i = 0;
  const runner = {
    exec: jest.fn().mockImplementation((value) => {
      i++;
      if (i === 3) {
        return Promise.reject(new Error('from error'));
      }
      return Promise.resolve(value);
    }),
    close: jest.fn(),
  };
  config.github.username = 'di';
  config.github.password = 'pass';
  bashRunner.BashRunner = jest.fn().mockImplementation(() => {
    return runner;
  });
  DeploymentLog.findOne = jest.fn().mockResolvedValueOnce(log).mockResolvedValueOnce(null);
  await running();
  expect(log.update.mock.calls[0][0].status).toBe('in progress');
  expect(runner.exec.mock.calls[0][0]).toBe('git pull di:pass');
  expect(runner.exec.mock.calls[1][0]).toBe('cd .');
  expect(log.update.mock.calls[1][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass',
    percentage: Math.floor((1 / 3) * 100),
  });
  expect(log.update.mock.calls[2][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .',
    percentage: Math.floor((2 / 3) * 100),
  });
  expect(log.update.mock.calls[3][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\ncd .\ntest\nfrom error',
    status: 'failed',
  });
});

test('running a command with error in middle', async () => {
  const log = {
    update: jest.fn().mockResolvedValue({}),
    Service: {
      command: JSON.stringify([
        { type: 'git-pull', value: 'git pull USERNAME:PASSWORD' },
        { type: 'bash', value: 'cd .' },
        { type: 'bash', value: 'test' },
      ]),
    },
  };
  let i = 0;
  const runner = {
    exec: jest.fn().mockImplementation((value) => {
      i++;
      if (i === 2) {
        return Promise.reject(new Error('from error'));
      }
      return Promise.resolve(value);
    }),
    close: jest.fn(),
  };
  config.github.username = 'di';
  config.github.password = 'pass';
  bashRunner.BashRunner = jest.fn().mockImplementation(() => {
    return runner;
  });
  DeploymentLog.findOne = jest.fn().mockResolvedValueOnce(log).mockResolvedValueOnce(null);
  await running();
  expect(log.update.mock.calls[0][0].status).toBe('in progress');
  expect(runner.exec.mock.calls[0][0]).toBe('git pull di:pass');
  expect(runner.exec.mock.calls[1][0]).toBe('cd .');
  expect(log.update.mock.calls[1][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass',
    percentage: Math.floor((1 / 3) * 100),
  });
  expect(log.update.mock.calls[2][0]).toEqual({
    output: 'git pull USERNAME:PASSWORD\ngit pull di:pass\ncd .\nfrom error',
    status: 'failed',
  });
});

test('running a command with unknown error', async () => {
  const log = {
    update: jest.fn().mockResolvedValue({}),
    Service: {
      command: JSON.stringify([
        { type: 'git-pull', value: 'git pull USERNAME:PASSWORD' },
        { type: 'bash', value: 'cd .' },
        { type: 'bash', value: 'test' },
      ]),
    },
  };
  config.github.username = 'di';
  config.github.password = 'pass';
  bashRunner.BashRunner = jest.fn().mockImplementation(() => {
    throw new Error('unknown');
  });
  DeploymentLog.findOne = jest.fn().mockResolvedValue(log);
  await expect(async () => await running()).rejects.toThrow('unknown');
});

test('running a command with unknown error', async () => {
  const findOne = jest.fn().mockResolvedValue(null);
  DeploymentLog.findOne = findOne;

  await Promise.all([running(), running()]);
  expect(findOne.mock.calls.length).toBe(1);
});

test('register client self to server', async () => {
  const postMethod = jest.spyOn(axios, 'post').mockResolvedValue(true);
  config.jwt.secret = 'xxxxxjjjjjjxxxx';
  await registerSelf();
  expect(postMethod.mock.calls[0][1]).toEqual({
    name: ip.getLocalHostName(),
    ip: ip.getLocalIPs()[0],
  });
  expect(postMethod.mock.calls[0][2]?.headers.Cookie).toContain(config.jwt.cookieKey);
  jest.restoreAllMocks();
});
