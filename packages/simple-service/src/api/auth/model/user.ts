import { userHelper } from '../helper';
import zxcvbn from 'zxcvbn';
import dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';
import * as lib from '../../../lib';
import appDBs from '../../../config/model/app';
import type { I18nType } from '../../../types';
import { randomPassword } from '../../../lib/util/password';
import { job } from '../../../queue/helper';
import config from '../../../config/config';

const {
  error: { AuthError },
  util,
  logger,
} = lib;
const {
  gateway: {
    models: {
      User,
      UserProfile,
      UserLoginHistory,
      UserToken,
    },
    sequelize,
  }
} = appDBs;

type UserParams = {
  email: string;
  password: string;
  client: {
    deviceType: string;
    os: string;
    browser: string;
    timeZone: string;
  };
  ip: string;
  userAgent: string;
  referer: string;
};

export const login = async (params: UserParams, i18n: I18nType): Promise<{ token: string; reset: boolean, email: string }> => {
  const { email, password } = params;
  let locked = false;
  let userId: number;
  const result = await sequelize.transaction(async (transaction) => {
    let user = await User.findOne({ where: { email }, transaction });
    if (!user) {
      logger.error(`User(${email}) is not found.`);
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }

    user = await userHelper.checkLockStatus({ user, User, i18n, transaction });

    if (!user) {
      logger.error(`Checked user(${email}) is not found.`);
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }

    if (config.auth.traceLogin) {
      await UserLoginHistory.create(
        {
          node_env: config.nodeEnv,
          app_env: config.appEnv,
          email: user.email,
          ip: params.ip,
          user_agent: params.userAgent,
          referer: params.referer,
          device_type: params.client?.deviceType,
          os: params.client?.os,
          browser: params.client?.browser,
          timezone: params.client?.timeZone,
        },
        { transaction },
      );
    }

    if (await util.password.isPasswordEqual(password, user.password)) {
      user.sign_in_count += 1;
      user.last_sign_in_at = user.current_sign_in_at;
      user.current_sign_in_at = dayjs.utc().format();
      user.last_sign_in_ip = user.current_sign_in_ip;
      user.current_sign_in_ip = params.ip;
      user.failed_attempts = 0;
      user.locked_at = null;
      user.unlock_token = null;
      await user.save({ transaction });
    } else {
      user.failed_attempts += 1;
      if (user.failed_attempts >= config.auth.failedAttemptCount) {
        user.locked_at = dayjs.utc().format();
        user.unlock_token = uuidV4();
        locked = true;
        userId = user.id;
      }
      await user.save({ transaction });
      return null;
    }

    let reset = false;
    if (config.auth.checkExpiredPass) {
      if (user.last_change_pass_at) {
        reset = dayjs.utc(user.last_change_pass_at).add(config.auth.passwordResetCycle, 'day').isBefore(dayjs.utc());
      } else {
        reset = true;
      }
    }

    const token = await userHelper.createJwtToken({
      id: user.id,
      type: 'user',
      transaction,
      UserToken,
    });

    return {
      token,
      reset,
      email: user.email,
    };
  });

  if (!result) {
    if (locked && !config.isDev) {
      // must be placed outside transaction
      await job.enqueue('auth-lock-email', { userId: userId! });
    }
    logger.error(`Incorrect password(${password}) of User(${email}).`);
    throw new AuthError(i18n.t('auth.errorPassword'));
  }

  return result;
};

type RegisterParams = {
  email: string;
  displayName: string;
  password: string;
};

export const register = async (params: RegisterParams, i18n: I18nType) => {
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

  let userId: number;
  await sequelize.transaction(async (transaction) => {
    const oldUser = await User.findOne({
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
      confirmation_token: uuidV4(),
      unconfirmed_email: email,
      last_change_pass_at: dayjs.utc().format(),
    }, {
      transaction,
    });

    userId = user.id;
    await UserProfile.create({
      user_id: userId,
      display_name: displayName
    }, {
      transaction,
    });
  });

  // must be placed outside transaction
  if (!config.isDev) {
    await job.enqueue('auth-confirmation-email', { userId: userId! });
  }

  return true;
};

export const forgotPassword = async ({ email }: { email: string }, i18n: I18nType) => {
  let userId: number;
  await sequelize.transaction(async (transaction) => {
    let user = await User.findOne({ where: { email }, transaction });
    if (!user) {
      logger.error(`User(${email}) is not found.`);
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }
    userId = user.id;
    user = await userHelper.checkLockStatus({ user, transaction, i18n, User });
    await user?.update(
      {
        reset_password_token: uuidV4(),
      },
      {
        transaction,
      },
    );
  });

  // must be placed outside transaction
  if (!config.isDev) {
    await job.enqueue('auth-forgot-email', { userId: userId! });
  }
};