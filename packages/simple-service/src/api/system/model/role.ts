import _ from 'lodash';
import appDBs from '../../../config/model/app';
import { reparent, createTreeItem, deleteTreeItem, getTreeData } from '../../../lib/util/database-tree-data';

const {
  gateway: {
    models: { RbacRole },
    sequelize,
  },
} = appDBs;

export const getRoles = async () => {
  return await sequelize.transaction(async (transaction) => {
    const rows = await RbacRole.findAll({
      transaction,
    });
    const items = _.map(rows, (row) => {
      return {
        id: row.id,
        parent_id: row.parent_id,
        name: row.name,
        sequence_id: row.sequence_id,
        data: {
          description: row.description,
          enabled: row.enabled,
        },
      };
    });
    return getTreeData({ items });
  });
};

interface CreateRoleParams {
  targetId: number;
  position: string;
  enabled: boolean;
  name: string;
  description: string;
}
export const createRole = async (params: CreateRoleParams) => {
  await sequelize.transaction(async (transaction) => {
    await createTreeItem({
      values: {
        enabled: params.enabled,
        name: params.name,
        description: params.description,
      },
      targetId: params.targetId,
      position: params.position,
      Model: RbacRole,
      transaction,
    });
  });
  return true;
};

interface UpdateRoleParams {
  id: number;
  enabled?: boolean;
  name?: string;
  description?: string;
}
export const updateRole = async (params: UpdateRoleParams) => {
  const values = _.pickBy({
    enabled: params.enabled,
    name: params.name,
    description: params.description,
  });
  const [count] = await RbacRole.update(values, {
    where: {
      id: params.id,
    },
  });
  return count;
};

interface ReparentParams {
  sourceId: number;
  targetId: number;
  position: string;
}
export const reparentRole = async (params: ReparentParams) => {
  await sequelize.transaction(async (transaction) => {
    await reparent({
      targetId: params.targetId,
      sourceId: params.sourceId,
      position: params.position,
      Model: RbacRole,
      transaction,
    });
  });
  return true;
};

export const deleteRole = async ({ id }: { id: number }) => {
  await sequelize.transaction(async (transaction) => {
    await deleteTreeItem({
      id,
      Model: RbacRole,
      transaction,
    });
  });
  return true;
};
