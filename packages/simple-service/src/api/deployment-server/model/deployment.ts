import _ from 'lodash';
import { Order, WhereOptions } from 'sequelize';
import { MergedParams } from '../../../type';
import appDB from '../../../config/model/app';
import {
  ServiceDef,
  Service as ServiceIns,
  AgentServiceDef,
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