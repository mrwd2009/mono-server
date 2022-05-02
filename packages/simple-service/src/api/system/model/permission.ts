import _ from 'lodash';
import appDBs from '../../../config/model/app';
import { reparent, createTreeItem, deleteTreeItem, getTreeData } from '../../../lib/util/database-tree-data';

const {
  gateway: {
    models: { RbacPermission },
    sequelize,
  },
} = appDBs;

export const getPermissions = async () => {
  const rows = await RbacPermission.findAll({
    attributes: ['id', 'parent_id', 'name', 'sequence_id', 'type', 'description'],
  });
  const items = _.map(rows, (row) => {
    return {
      id: row.id,
      parent_id: row.parent_id,
      name: row.name,
      sequence_id: row.sequence_id,
      data: {
        type: row.type,
        description: row.description,
      },
    };
  });
  return getTreeData({ items });
};

interface CreatePermissionParams {
  targetId: number;
  position: string;
  type: string;
  name: string;
  description: string;
}
export const createPermission = async (params: CreatePermissionParams) => {
  await sequelize.transaction(async (transaction) => {
    await createTreeItem({
      values: {
        type: params.type,
        name: params.name,
        description: params.description,
      },
      targetId: params.targetId,
      position: params.position,
      Model: RbacPermission,
      transaction,
    });
  });
  return true;
};

interface UpdatePermissionParams {
  id: number;
  type?: string;
  name?: string;
  description?: string;
}
export const updatePermission = async (params: UpdatePermissionParams) => {
  const values = _.pickBy({
    type: params.type,
    name: params.name,
    description: params.description,
  });
  const [count] = await RbacPermission.update(values, {
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
export const reparentPermission = async (params: ReparentParams) => {
  await sequelize.transaction(async (transaction) => {
    await reparent({
      targetId: params.targetId,
      sourceId: params.sourceId,
      position: params.position,
      Model: RbacPermission,
      transaction,
    });
  });
  return true;
};

export const deletePermission = async ({ id }: { id: number }) => {
  await sequelize.transaction(async (transaction) => {
    await deleteTreeItem({
      id,
      Model: RbacPermission,
      transaction,
    });
  });
  return true;
};
