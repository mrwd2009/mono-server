import _ from 'lodash';
import { Order, WhereOptions } from 'sequelize';
import { MergedParams, PageParams } from '../../../type';
import appDB from '../../../config/model/app';
import {
  ServiceDef,
  Service as ServiceIns,
  AgentServiceDef,
  AgentDef,
  Agent as AgentIns,
  DeploymentLogDef,
  DeploymentLog as DeploymentLogIns,
} from '../../../config/model/type';
import { LogicError } from '../../../lib/error';

const {
  gateway: {
    sequelize,
    models,
  }
} = appDB;
const Service = models.Service as ServiceDef;
const AgentService = models.AgentService as AgentServiceDef;
const Agent = models.Agent as AgentDef;
const DeploymentLog = models.DeploymentLog as DeploymentLogDef;

export const createService = async (params: MergedParams): Promise<boolean>  => {
  await Service.create(params);
  return true;
}

export const getServiceList = async (params: MergedParams): Promise<{ list: Array<ServiceIns>, total: number }> => {
  const {
    filter,
    sorter,
    pagination: {
      current,
      pageSize,
    },
  } = params;
  let order: Order = [];
  if (sorter) {
    order = [[sorter.field, sorter.direction]];
  }
  const where: WhereOptions = {};
  if (filter) {
    if (filter.name) {
      where.name = `%${filter.name}%`;
    }
    if (filter.category) {
      where.category = filter.category;
    }
    if (filter.description) {
      where.description = `%${filter.description}%`;
    }
  }
  const {
    rows,
    count,
  } = await Service.findAndCountAll({
    limit: pageSize,
    offset: (current - 1) * pageSize,
    order,
    where,
  });
  return {
    total: count,
    list: rows,
  };
};

export const assignAgent = async (params: MergedParams): Promise<boolean>  => {
  const {
    serviceId,
    agentIds,
  } = params;
  const assignedList = await AgentService.findAll({
    attributes: ['agent_id', 'status'],
    where: {
      service_id: serviceId,
    },
  });
  const existedIds = _.map(assignedList, 'agent_id');
  const addedIds = _.difference(agentIds, existedIds);
  const removedIds = _.difference(existedIds, agentIds);

  const hasInProgress = _.some(removedIds, id => {
    const item = _.find(assignedList, { agent_id: id });
    if (item) {
      return item.status === 'in progress';
    }
    return false;
  });

  if (hasInProgress) {
    throw new LogicError(`Can't remove agent which in progress.`);
  }

  await sequelize.transaction(transaction => {
    const items = _.map(addedIds, id => {
      return {
        service_id: serviceId,
        agent_id: id,
        status: 'ready',
      };
    });
    return Promise.all([
      AgentService.destroy({
        where: {
          service_id: serviceId,
          agent_id: removedIds,
        },
        transaction,
      }),
      AgentService.bulkCreate(items, {
        transaction,
      }),
    ]);
  });

  return true;
}

export const createAgent = async (params: MergedParams): Promise<boolean> => {
  const {
    name,
    ip,
  } = params;
  const agent = await Agent.findOne({
    where: {
      name,
    },
  });
  if (!agent) {
    await Agent.create({
      name,
      ip,
    });
    return true;
  }
  await agent.update({
    name,
    ip,
  });
  return true;
}

export const getAgentList = async (params: PageParams): Promise<{ list: Array<AgentIns>, total: number}> => {
  const {
    filter,
    sorter,
    pagination: {
      current,
      pageSize,
    }
  } = params;

  let order: Order = [];
  if (sorter) {
    order = [[sorter.field, sorter.direction]];
  }
  const where: WhereOptions = {};
  if (filter) {
    if (filter.name) {
      where.name = `%${filter.name}%`;
    }
    if (filter.ip) {
      where.ip = `%${filter.ip}%`;
    }
    if (filter.status) {
      where.status = filter.status;
    }
  }

  const {
    rows,
    count,
  } = await Agent.findAndCountAll({
    limit: pageSize,
    offset: (current - 1) * pageSize,
    order,
    where,
  });

  return {
    total: count,
    list: rows,
  };
}

export interface LogItem {
  id: number,
  agent_id: number,
  agent_name: string,
  service_id: number,
  service_name: string,
  status: string,
  created_at: Date,
  updated_at: Date,
}

export const getLogList = async (params: PageParams): Promise<{ list: Array<LogItem>, total: number}> => {
  const {
    filter,
    sorter,
    pagination: {
      current,
      pageSize,
    }
  } = params;

  let order: Order = [];
  if (sorter) {
    order = [[sorter.field, sorter.direction]];
  }
  const where: WhereOptions = {};
  if (filter) {
    if (filter.agent_id) {
      where.agent_id = filter.agent_id;
    }
    if (filter.service_id) {
      where.service_id = filter.service_id;
    }
    if (filter.status) {
      where.status = filter.status;
    }
  }

  const {
    rows,
    count,
  } = await DeploymentLog.findAndCountAll({
    limit: pageSize,
    offset: (current - 1) * pageSize,
    order,
    where,
    include: [Agent, Service],
  });

  return {
    total: count,
    list: _.map(rows, row => {
      return {
        id: row.id,
        agent_id: row.agent_id,
        agent_name: (row.Agent as AgentIns).name,
        service_id: row.service_id,
        service_name: (row.Service as ServiceIns).name,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }
    }),
  };
}