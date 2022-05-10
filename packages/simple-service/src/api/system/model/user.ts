import zxcvbn from 'zxcvbn';
import dayjs from 'dayjs';
import _ from 'lodash';
import { FormattedPageParams } from '../../../types';
import appDBs from '../../../config/model/app';
import { I18nType } from '../../../types';
import { randomPassword } from '../../../lib/util/password';
import { LogicError, DataError } from '../../../lib/error';
import config from '../../../config/config';

const {
  gateway: {
    models: { User, UserLoginHistory, UserProfile, RbacUserRole, RbacRole, OAuth2User, UserToken },
    sequelize,
  },
} = appDBs;

export const getUserList = async (params: FormattedPageParams) => {
  const { rows, count } = await User.findAndCountAll({
    attributes: [
      'id',
      'email',
      'reset_password_sent_at',
      'confirmed_at',
      'sign_in_count',
      'current_sign_in_at',
      'last_sign_in_at',
      'current_sign_in_ip',
      'last_sign_in_ip',
      'failed_attempts',
      'locked_at',
      'last_change_pass_at',
      'enabled',
      'created_at',
      'updated_at',
    ],
    include: [
      {
        attributes: ['display_name'],
        model: UserProfile,
      },
      {
        attributes: ['role_id'],
        model: RbacUserRole,
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
    const relatedRoles = row.RbacUserRoles;
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
    const relatedRoles = row.RbacUserRoles;
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

interface CreateParams {
  email: string;
  displayName: string;
  password: string;
  enabled: boolean;
  roleId?: number;
}
export const createUser = async (params: CreateParams, i18n: I18nType) => {
  const { email, displayName, password, enabled, roleId } = params;

  if (zxcvbn(password).score < 2) {
    const error = new LogicError(i18n.t('auth.weekPassword', { password: randomPassword() }));
    error.public = true;
    throw error;
  }

  await sequelize.transaction(async (transaction) => {
    const oldUser = await User.findOne({
      attributes: ['id'],
      where: {
        email,
      },
      transaction,
    });
    if (oldUser) {
      throw new LogicError(`User has already existed.`);
    }

    const user = await User.create(
      {
        email,
        password,
        enabled,
        last_change_pass_at: dayjs.utc().format(),
      },
      {
        transaction,
      },
    );

    await UserProfile.create(
      {
        user_id: user.id,
        display_name: displayName,
      },
      {
        transaction,
      },
    );

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

      await RbacUserRole.create(
        {
          user_id: user.id,
          app: config.appEnv,
          role_id: roleId,
        },
        {
          transaction,
        },
      );
    }

    return true;
  });
};

interface EditParams {
  id: number | number[];
  type: string;
  enabled?: boolean;
  roleId?: number;
  displayName?: string;
  password?: string;
}
export const editUser = async (params: EditParams, i18n: I18nType) => {
  const { id, type, enabled, roleId, displayName, password } = params;

  if (type === 'password') {
    if (zxcvbn(password!).score < 2) {
      const error = new LogicError(i18n.t('auth.weekPassword', { password: randomPassword() }));
      error.public = true;
      throw error;
    }

    await sequelize.transaction(async (transaction) => {
      const user = await User.findOne({
        attributes: ['id'],
        where: {
          id,
        },
        transaction,
      });

      if (!user) {
        throw new LogicError(i18n.t('auth.notFoundUser'));
      }

      user.password = password!;
      await user.save({ transaction });
    });

    return true;
  }

  if (type === 'edit') {
    await sequelize.transaction(async (transaction) => {
      const user = await User.findOne({
        attributes: ['id', 'enabled'],
        where: {
          id,
        },
        include: [
          {
            attributes: ['id', 'display_name'],
            model: UserProfile,
          },
          {
            attributes: ['id', 'role_id'],
            model: RbacUserRole,
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
            UserToken.update(
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

      const profile = user.UserProfile!;
      if (profile.display_name !== displayName) {
        profile.display_name = displayName!;
        ops.push(profile.save({ transaction }));
      }

      const roles = user.RbacUserRoles!;
      if (roles.length) {
        await RbacUserRole.destroy({
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
          RbacUserRole.create(
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

    const count = await User.count({
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

    await RbacUserRole.destroy({
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

      await RbacUserRole.bulkCreate(items, {
        transaction,
      });
    }
  });

  return true;
};

export const deleteUser = async (params: { id: number }, i18n: I18nType) => {
  const { id } = params;
  const user = await User.findOne({
    attributes: ['id'],
    where: {
      id,
    },
  });
  if (!user) {
    throw new LogicError(i18n.t('auth.notFoundUser'));
  }

  await user.destroy();
};

export const getUserLoginHistoryList = async (params: FormattedPageParams) => {
  const { rows, count } = await UserLoginHistory.findAndCountAll({
    attributes: [
      'id',
      'node_env',
      'app_env',
      'email',
      'ip',
      'user_agent',
      'referer',
      'device_type',
      'os',
      'browser',
      'timezone',
      'created_at',
    ],
    ...params,
    where: {
      ...params.where,
      node_env: config.nodeEnv,
      app_env: config.appEnv,
    },
  });

  return {
    total: count,
    list: rows,
  };
};

export const getUserAvatar = async (user: { id: number; type: string }) => {
  const avatar: {
    url?: string;
    base64?: string;
  } = {};

  if (user.type === 'user') {
    const profile = await UserProfile.findOne({
      attributes: ['avatar', 'avatar_base64'],
      where: {
        user_id: user.id,
      },
    });

    if (!profile) {
      throw new DataError('User is not found.');
    }
    avatar.url = profile.avatar!;
    avatar.base64 = profile.avatar_base64!;
  } else if (user.type === 'oauth2') {
    const oauth2User = await OAuth2User.findOne({
      attributes: ['picture'],
      where: {
        id: user.id,
      },
    });

    if (!oauth2User) {
      throw new DataError('User is not found.');
    }
    avatar.url = oauth2User.picture!;
  }

  return avatar;
};

export const saveUserProfile = async (params: { photo?: null | string; displayName: string }, user: { id: number, type: string }) => {
  if (user.type !== 'user') {
    throw new LogicError('Modification on profile is not supported on current account type.');
  }

  const { photo, displayName } = params;
  const profile = await UserProfile.findOne({
    attributes: ['id', 'display_name', 'avatar', 'avatar_base64'],
    where: {
      user_id: user.id,
    },
  });

  if (!profile) {
    throw new DataError('User profile is not found.');
  }

  if (photo) {
    profile.avatar = null;
    profile.avatar_base64 = photo;
  } else if (photo === null) {
    profile.avatar = null;
    profile.avatar_base64 = null;
  }

  profile.display_name = displayName;

  await profile.save();

  return true;
};
