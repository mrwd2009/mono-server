import _ from 'lodash';
import { FormattedPageParams } from '../../../types';
import appDBs from '../../../config/model/app';
import { I18nType } from '../../../types';
import { LogicError } from '../../../lib/error';
import config from '../../../config/config';

const {
  gateway: {
    models: { RbacOAuth2UserRole, OAuth2UserToken, RbacRole, OAuth2User },
    sequelize,
  },
} = appDBs;

export const getOAuth2UserList = async (params: FormattedPageParams) => {
  const { rows, count } = await OAuth2User.findAndCountAll({
    attributes: ['id', 'email', 'name', 'sub', 'enabled', 'created_at', 'updated_at'],
    include: [
      {
        attributes: ['role_id'],
        model: RbacOAuth2UserRole,
        where: {
          app: config.appEnv,
        },
        required: false,
      },
    ],
    ...params,
  });

  const roleIds: number[] = [];
  _.forEach(rows, (row) => {
    const relatedRoles = row.RbacOAuth2UserRoles;
    if (relatedRoles?.length) {
      roleIds.push(relatedRoles[0].role_id);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const roleNameMap: any = {};
  if (roleIds.length) {
    const roles = await RbacRole.findAll({
      attributes: ['id', 'name'],
      where: {
        id: roleIds,
      },
    });
    _.forEach(roles, (role) => {
      roleNameMap[role.id] = role.name;
    });
  }

  const list = _.map(rows, (row) => {
    const relatedRoles = row.RbacOAuth2UserRoles;
    let roleName = '';
    if (relatedRoles?.length) {
      roleName = roleNameMap[relatedRoles[0].role_id];
    }
    return {
      ...row.toJSON(),
      roleName,
    };
  });

  return {
    total: count,
    list,
  };
};

interface EditParams {
  id: number | number[];
  type: string;
  enabled?: boolean;
  roleId?: number;
}
export const editOAuth2User = async (params: EditParams, i18n: I18nType) => {
  const { id, type, enabled, roleId } = params;

  if (type === 'edit') {
    await sequelize.transaction(async (transaction) => {
      const user = await OAuth2User.findOne({
        attributes: ['id', 'enabled'],
        where: {
          id,
        },
        include: [
          {
            attributes: ['id', 'role_id'],
            model: RbacOAuth2UserRole,
            where: {
              app: config.appEnv,
            },
            required: false,
          },
        ],
        transaction,
      });

      if (!user) {
        throw new LogicError(i18n.t('auth.notFoundUser'));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ops: any = [];
      if (user.enabled !== enabled) {
        user.enabled = enabled!;
        if (!user.enabled) {
          ops.push(
            OAuth2UserToken.update(
              {
                status: 'disabled',
              },
              {
                where: {
                  user_id: user.id,
                },
                transaction,
              },
            ),
          );
        }
        ops.push(user.save({ transaction }));
      }

      const roles = user.RbacOAuth2UserRoles!;
      if (roles.length) {
        await RbacOAuth2UserRole.destroy({
          where: {
            user_id: user.id,
            app: config.appEnv,
          },
          transaction,
        });
      }

      if (roleId) {
        const role = await RbacRole.findOne({
          attributes: ['id'],
          where: {
            id: roleId,
            enabled: true,
          },
          transaction,
        });
        if (!role) {
          throw new LogicError('Role is not found.');
        }
        ops.push(
          RbacOAuth2UserRole.create(
            {
              user_id: user.id,
              app: config.appEnv,
              role_id: roleId,
            },
            {
              transaction,
            },
          ),
        );
      }

      await Promise.all(ops);
    });

    return true;
  }

  const ids = id as number[];

  await sequelize.transaction(async (transaction) => {
    if (!ids.length) {
      throw new LogicError(i18n.t('auth.notFoundUser'));
    }

    const count = await OAuth2User.count({
      where: {
        id: ids,
      },
      transaction,
    });
    if (ids.length !== count) {
      throw new LogicError(i18n.t('auth.notFoundUser'));
    }

    if (roleId) {
      const role = await RbacRole.findOne({
        attributes: ['id'],
        where: {
          id: roleId,
          enabled: true,
        },
        transaction,
      });
      if (!role) {
        throw new LogicError('Role is not found.');
      }
    }

    await RbacOAuth2UserRole.destroy({
      where: {
        user_id: ids,
        app: config.appEnv,
      },
      transaction,
    });

    if (roleId) {
      const items = _.map(ids, (id) => ({
        user_id: id,
        app: config.appEnv,
        role_id: roleId,
      }));

      await RbacOAuth2UserRole.bulkCreate(items, {
        transaction,
      });
    }
  });

  return true;
};
