import { getServiceList, assignAgent, getAgentList, createService, getLogList } from './deployment';
import { Op } from 'sequelize';
import appDB from '../../../config/model/app';

const {
  gateway: {
    sequelize,
    models: {
      Service,
      AgentService,
      Agent,
      DeploymentLog,
    },
  }
} = appDB;

test('create service', async () => {
  let val;
  const spy = jest.spyOn(Service, 'create').mockImplementation((valIn) => {
    val = valIn;
  });
  await createService({
    name: 'test name',
    category: 'category',
  });
  expect(val.name).toBe('test name');
  expect(val.category).toBe('category');
  spy.mockRestore();
});

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
  const spy = jest.spyOn(AgentService, 'count').mockImplementation(async () => {
    return 2;
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
  const spyTran = jest.spyOn(AgentService, 'count').mockImplementation(async () => {
    return 0;
  });
  const spyDes = jest.spyOn(AgentService, 'destroy').mockImplementation(async (options) => {
    return;
  });
  const spyBulk = jest.spyOn(AgentService, 'bulkCreate').mockImplementation(async (items, bulkOptions) => {
    return;
  });
  await assignAgent({ serviceId: 1, agentIds: [3, 1] });
  expect(spyDes.mock.calls[0][0].where.service_id).toBe(1);
  spy.mockRestore();
  spyTran.mockRestore();
  spyDes.mockRestore();
  spyBulk.mockRestore();
});

test('return agent list', async () => {
  const result = {
    rows: [ new Agent({
      id: 1,
      name: 'test name',
      ip: '10.100.10.1',
      status: 'active',
    })],
    count: 1,
  };
  let inputOpt: any;
  const spy = jest.spyOn(Agent, 'findAndCountAll').mockImplementation( async (opt) => {
    inputOpt = opt;
    return result;
  });
  const params = {
    sorter: {
      field: 'name',
      order: 'asc'
    },
    filter: {
      ip: '10',
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
  const {
    total,
    list,
  } = await getAgentList(params);
  expect(total).toBe(1);
  expect(list.length).toBe(1);
  expect(list[0].name).toBe('test name');
  expect(inputOpt.order[0][0]).toBe('name');
  expect(inputOpt.where.ip[Op.like]).toBe('%10%');
  spy.mockRestore();
});

test('return log list', async () => {
  const result = {
    rows: [ {
      id: 1,
      agent_id: 2,
      Agent: {
        name: 'agent',
      },
      service_id: 2,
      Service: {
        name: 'service',
      },
      status: 'active',
    }],
    count: 1,
  };
  let inputOpt: any;
  const spy = jest.spyOn(DeploymentLog, 'findAndCountAll').mockImplementation( async (opt) => {
    inputOpt = opt;
    return result;
  });
  const params = {
    sorter: {
      field: 'agent_id',
      order: 'asc'
    },
    filter: {
      agent_id: 2,
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };
  const {
    total,
    list,
  } = await getLogList(params);
  expect(total).toBe(1);
  expect(list.length).toBe(1);
  expect(list[0].agent_id).toBe(2);
  expect(list[0].service_name).toBe('service');
  expect(inputOpt.order[0][0]).toBe('agent_id');
  expect(inputOpt.where.agent_id).toBe(2);
  spy.mockRestore();
});