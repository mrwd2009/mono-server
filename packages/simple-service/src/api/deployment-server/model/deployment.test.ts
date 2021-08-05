import { getServiceList, assignAgent } from './deployment';
import appDB from '../../../config/model/app';
import { Agent } from 'http';

const {
  gateway: {
    sequelize,
    models: {
      Service,
      AgentService,
    },
  }
} = appDB;

test('return service list', async () => {
  const result = {
    rows: [new Service({
      id: 1,
      name: 'test name',
      category: 'test category',
      description: 'test description',
      command: '',
      created_at: new Date(),
      updated_at: new Date(),
    })],
    count: 1,
  }
  const spy = jest.spyOn(Service, 'findAndCountAll').mockImplementation(async () => {
    return result;
  });
  const params = {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
  
  const {
    list,
    total,
  } = await getServiceList(params);
  expect(total).toBe(1);
  expect(list.length).toBe(1);
  expect(list[0].name).toBe('test name');
  spy.mockRestore();
});

test('assign agent throw', async () => {
  const result = [
    new AgentService({
      agent_id: 1,
      status: 'completed'
    }),
    new AgentService({
      agent_id: 2,
      status: 'in progress',
    })
  ];
  const spy = jest.spyOn(AgentService, 'findAll').mockImplementation(async () => {
    return result;
  });
  expect(assignAgent({ serviceId: 1, agentIds: [1] })).rejects.toThrowError();
  spy.mockRestore();
});

test('assign agent', async () => {
  const result = [
    new AgentService({
      agent_id: 1,
      status: 'completed'
    }),
    new AgentService({
      agent_id: 2,
      status: 'failed',
    })
  ];
  const spy = jest.spyOn(AgentService, 'findAll').mockImplementation(async () => {
    return result;
  });
  const spyTran = jest.spyOn(sequelize, 'transaction').mockImplementation(async (call1) => {
    await call1('transaction');
  });
  const spyDes = jest.spyOn(AgentService, 'destroy').mockImplementation(async (options) => {
    return;
  });
  const spyBulk = jest.spyOn(AgentService, 'bulkCreate').mockImplementation(async (items, bulkOptions) => {
    return;
  });
  await assignAgent({ serviceId: 1, agentIds: [3, 1] });
  expect(spyDes.mock.calls[0][0].where.service_id).toBe(1);
  expect(spyBulk.mock.calls[0][1].transaction).toBe('transaction');
  spy.mockRestore();
  spyTran.mockRestore();
  spyDes.mockRestore();
  spyBulk.mockRestore();
});