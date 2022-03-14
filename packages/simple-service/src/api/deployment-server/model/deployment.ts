import _ from 'lodash';
import { Order, WhereOptions, Op, QueryTypes } from '@sequelize/core';
import { MergedParams, PageParams } from '../../../type';
import appDB from '../../../config/model/app';
import { LogicError } from '../../../lib/error';
import { ServiceModel, AgentModel } from '../../../model/types';

const {
  gateway: {
    sequelize,
    models,
  }
} = appDB;
const { SELECT } = QueryTypes;
const Service = models.Service;
const AgentService = models.AgentService;
const Agent = models.Agent;
const DeploymentLog = models.DeploymentLog;

export const createService = async (params: MergedParams): Promise<boolean>  => {
  await Service.create(params);
  return true;
}

export const getServiceList = async (params: MergedParams): Promise<{ list: Array<ServiceModel>, total: number }> => {
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
    order = [[sorter.field, sorter.order]];
  }
  const where: WhereOptions = {};
  if (filter) {
    if (filter.name) {
      where.name = {
        [Op.like]: `%${filter.name}%`,
      };
    }
    if (filter.category) {
      where.category = filter.category;
    }
    if (filter.description) {
      where.description = {
        [Op.like]: `%${filter.description}%`,
      };
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

export const getServiceAgentList = async (params: MergedParams): Promise<{ list: Array<{ id: number }>, total: number }> => {
  const {
    pagination: {
      current,
      pageSize,
    },
    service_id,
    direction,
  } = params;
  const limit = pageSize;
  const offset = (current - 1) * pageSize;
  let countSql = '';
  let resultSql = '';
  if (direction === 'left') {
    countSql = `
      select count(*) as count from agents
      where id not in (
        select agents.id from agents inner join agents_services on agent_id = agents.id
        where service_id = :service_id
      )
    `;
    resultSql= `
    select id, name, ip from agents
      where id not in (
        select agents.id from agents inner join agents_services on agent_id = agents.id
        where service_id = :service_id
      )
      limit :limit offset :offset
    `;
  } else {
    countSql = `
      select count(*) as count from agents inner join agents_services on agent_id = agents.id
      where service_id = :service_id
    `;
    resultSql= `
      select agents.id, name, ip from agents inner join agents_services on agent_id = agents.id
      where service_id = :service_id
      limit :limit offset :offset
    `;
  }
  const [
    count,
    rows,
  ] = await Promise.all([
    sequelize.query(countSql, {
      type: SELECT,
      replacements: {
        service_id,
      },
    }),
    sequelize.query(resultSql, {
      replacements: {
        limit,
        offset,
        service_id,
      },
      type: SELECT,
    })
  ])
  return {
    total: (count[0] as { count: number }).count,
    list: rows as Array<{ id: number }>,
  };
};

export const assignAgent = async (params: MergedParams): Promise<boolean>  => {
  const {
    serviceId,
    agentIds,
    action,
  } = params;
  if (action === 'add') {
    const items = _.map(agentIds, id => {
      return {
        service_id: serviceId,
        agent_id: id,
        status: 'ready',
      };
    });
    await AgentService.bulkCreate(items);
    return true
  }

  const count = await AgentService.count({
    where: {
      service_id: serviceId,
      agent_id: agentIds,
      status: 'in progress',
    }
  });

  if (count > 0) {
    throw new LogicError(`Can't remove agent which in progress.`);
  }

  await AgentService.destroy({
    where: {
      service_id: serviceId,
      agent_id: agentIds,
    },
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

export const getAgentList = async (params: PageParams): Promise<{ list: Array<AgentModel>, total: number}> => {
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
    order = [[sorter.field, sorter.order]];
  }
  const where: WhereOptions = {};
  if (filter) {
    if (filter.name) {
      where.name = {
        [Op.like]: `%${filter.name}%`
      };
    }
    if (filter.ip) {
      where.ip = {
        [Op.like]: `%${filter.ip}%`
      };
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
    order = [[sorter.field, sorter.order]];
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
    attributes: ['id', 'agent_id', 'service_id', 'status', 'created_at', 'updated_at'],
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
        agent_name: row.Agent!.name,
        service_id: row.service_id,
        service_name: row.Service!.name,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }
    }),
  };
}