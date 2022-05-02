// TODO complete this middleware
import Koa, { Middleware } from 'koa';
import _ from 'lodash';
import { QueryTypes } from '@sequelize/core';
import config from '../../config';
import appDBs from '../../model/app';
import * as lib from '../../../lib';
import permissions from './permissions';

const {
  gateway: {
    sequelize,
  },
} = appDBs;

const {
  error: { ForbiddenError },
} = lib;

type PermissionKeys = keyof (typeof permissions);

export {
  permissions,
};

export const getUserPermissions = async (id: number): Promise<number[]> => {
  const sql = `
    select rbac_roles.id, sequence_id from rbac_roles inner join rbac_users_roles on rbac_roles.id = rbac_users_roles.role_id
    where rbac_users_roles.app = :appEnv and user_id = :userId and enabled = 1
  `;
  const roles = await sequelize.query<{ sequence_id: string }>(sql, {
    type: QueryTypes.SELECT,
    replacements: {
      appEnv: config.appEnv,
      userId: id,
    },
  });
  if (!roles.length) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replacements: any = {};
  let queryStr = '';
  _.forEach(roles, (role, i) => {
    queryStr = `${queryStr ? ' or ' : ''} sequence_id like :sequenceId${i}`;
    replacements[`sequenceId${i}`] = `${role.sequence_id}%`;
  });
  const permissionSql = `
    select rbac_permissions.id from rbac_permissions inner join rbac_roles_permissions on rbac_permissions.id = permission_id
    where role_id in (
      select id from rbac_roles where ${queryStr}
    )
  `;

  const permissions = await sequelize.query<{ id: number }>(permissionSql, {
    type: QueryTypes.SELECT,
    replacements,
  });

  return _.map(permissions, 'id');
};

export const checkPermission = (permissionKey: PermissionKeys): Middleware => {
  return async (context, next) => {
    // maybe we want to skip permission checking on saleforce api
    if (context.state.user?.type !== 'user') {
      return await next();
    }
    // skip checking in development mode.
    if (config.isDev) {
      return await next();
    }
    // only work for user session.
    const permissionId = permissions[permissionKey];
    if (permissionId) {
      const permissionIds = await getUserPermissions(context.state.user.id);
      if (_.includes(permissionIds, permissionId)) {
        return await next();
      }
      throw new ForbiddenError('Forbidden request!');
    } else {
      throw new ForbiddenError('Invalid permission!');
    }
  }
};

const adminR = checkPermission('Admin.Read');
const adminW = checkPermission('Admin.Write');
const generalR = checkPermission('General.Read');
const generalW = checkPermission('General.Write');
const advancedR = checkPermission('Advanced.Read');
const advancedW = checkPermission('Advanced.Write');

export {
  adminR,
  adminW,
  generalR,
  generalW,
  advancedR,
  advancedW,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initialize = async (app: Koa): Promise<void> => {
  return;
};

export default initialize;
