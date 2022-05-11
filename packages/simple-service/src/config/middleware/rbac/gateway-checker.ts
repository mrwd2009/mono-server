import _ from 'lodash';
import { QueryTypes } from '@sequelize/core';
import appDBs from '../../model/app';
import permissions from './permissions';
import config from '../../config';
import { mainRedis } from '../../../lib/redis';
import { Checker, registerChecker, CheckerResult, registerGetPermissionsMethod } from './checker';

const {
  gateway: { sequelize },
} = appDBs;

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

registerGetPermissionsMethod('user', getUserPermissions);

const checker: Checker = async (payload, permissionKey): Promise<CheckerResult> => {
  if (payload.type === 'user') {
    const permissionId = permissions[permissionKey];
    if (permissionId) {
      const cacheKey = `rbac-${payload.type}-${payload.id}`;
      let permissionIds: number[] = [];
      try {
        const pStr = await mainRedis.get(cacheKey);
        permissionIds = JSON.parse(pStr);
      } catch {
        permissionIds = await getUserPermissions(payload.id);
        await mainRedis.set(cacheKey, JSON.stringify(permissionIds), config.systemCache.passportExpired);
      }
      if (_.includes(permissionIds, permissionId)) {
        return {
          passed: true,
          permissions: permissionIds,
        };
      }
    }
  }

  return {
    passed: false,
  };
};

registerChecker(checker);

export default checker;
