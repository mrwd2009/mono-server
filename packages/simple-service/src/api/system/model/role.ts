import _ from 'lodash';
import { fn, col } from '@sequelize/core';
import appDBs from '../../../config/model/app';
import { reparent, createTreeItem, deleteTreeItem, getTreeData } from '../../../lib/util/database-tree-data';

const {
  gateway: {
    models: { RbacRole, RbacPermission, RbacRolePermission },
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
  }, val => val !== undefined);
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

export const getAssignedPermissions = async ({ id }: { id: number }) => {
  const [
    rows,
    assignedList,
  ] = await Promise.all([
    RbacPermission.findAll({
      attributes: ['id', 'parent_id', 'name', 'sequence_id', 'type']
    }),
    RbacRolePermission.findAll({
      attributes: [[fn('distinct', col('permission_id')), 'p_id']],
      where: {
        role_id: id,
      }
    }),
  ]);
  const items = _.map(rows, (row) => {
    return {
      id: row.id,
      parent_id: row.parent_id,
      name: row.name,
      sequence_id: row.sequence_id,
      data: {
        type: row.type,
      },
    };
  });
  const {
    roots,
  } = getTreeData({ items });
  const checkedKeys = _.map(assignedList, (item) => {
    return item.get('p_id');
  });

  return {
    checkedKeys,
    roots,
  };
};

export const assignPermissions = async ({ id, permissionIds }: { id: number, permissionIds: number[] }) => {
  await sequelize.transaction(async (transaction) => {
    const items = _.map(permissionIds, (pId) => {
      return {
        role_id: id,
        permission_id: pId,
      };
    });
    await RbacRolePermission.destroy({
      where: {
        role_id: id,
      },
      transaction,
    });
    await RbacRolePermission.bulkCreate(items, {
      transaction,
    });
  });

  return true;
};

