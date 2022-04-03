import zxcvbn from 'zxcvbn';
import dayjs from 'dayjs';
import { FormattedPageParams } from '../../../types';
import appDBs from '../../../config/model/app';
import { I18nType } from '../../../types';
import { randomPassword } from '../../../lib/util/password';
import { AuthError } from '../../../lib/error';

const {
  gateway: {
    models: {
      User,
      UserLoginHistory,
      UserProfile,
    },
    sequelize,
  }
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
    include: {
      model: UserProfile,
      attributes: ['display_name']
    },
    ...params,
  });

  return {
    total: count,
    list: rows,
  };
}; 

interface CreateParams {
  email: string;
  displayName: string;
  password: string;
}
export const createUser = async (params: CreateParams, i18n: I18nType) => {
  const {
    email,
    displayName,
    password,
  } = params;

  if (zxcvbn(password).score < 2) {
    const error = new AuthError(i18n.t('auth.weekPassword', { password: randomPassword() }));
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
      throw new AuthError(`User has already existed.`);
    }

    const user = await User.create({
      email,
      password,
      last_change_pass_at: dayjs.utc().format(),
    }, {
      transaction,
    });

    await UserProfile.create({
      user_id: user.id,
      display_name: displayName
    }, {
      transaction,
    });
  });
}

interface EditParams {
  id: number;
  displayName: string;
  password: string;
}
export const editUser = async (params: EditParams, i18n: I18nType) => {
  const {
    id,
    displayName,
    password,
  } = params;

  if (zxcvbn(password).score < 2) {
    const error = new AuthError(i18n.t('auth.weekPassword', { password: randomPassword() }));
    error.public = true;
    throw error;
  }

  await sequelize.transaction(async (transaction) => {
    const user = await User.findOne({
      attributes: ['id'],
      where: {
        id,
      },
      include: {
        attributes: ['id', 'display_name'],
        model: UserProfile
      },
      transaction,
    });

    if (!user) {
      throw new AuthError(i18n.t('auth.notFoundEmail'));
    }

    user.password = password;
    const profile = user.UserProfile!;
    profile.display_name = displayName;

    await Promise.all([
      user.save({ transaction }),
      profile.save({ transaction }),
    ]);
  });
}

export const deleteUser = async (params: { id: number }, i18n: I18nType) => {
  const {
    id,
  } = params;
  const user = await User.findOne({
    attributes: ['id'],
    where: {
      id,
    },
  });
  if (!user) {
    throw new AuthError(i18n.t('auth.notFoundEmail'));
  }

  await user.destroy();
}

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
  });

  return {
    total: count,
    list: rows,
  };
}; 
