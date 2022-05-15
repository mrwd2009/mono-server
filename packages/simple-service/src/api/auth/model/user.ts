import { userHelper } from '../helper';
import zxcvbn from 'zxcvbn';
import dayjs from 'dayjs';
import { Op } from '@sequelize/core';
import * as lib from '../../../lib';
import appDBs from '../../../config/model/app';
import type { I18nType } from '../../../types';
import { randomPassword } from '../../../lib/util/password';
import { job } from '../../../queue/helper';
import config from '../../../config/config';
import { DataError, LogicError } from '../../../lib/error';
import { getJwtTokenSignature } from '../../../lib/util/common';

const {
  error: { AuthError },
  util,
  logger,
} = lib;
const {
  gateway: {
    models: { User, UserProfile, UserLoginHistory, UserToken, OAuth2UserToken },
    sequelize,
  },
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
  origin: string;
};

// because we support multiple app with one user database, we can't simply delete jwt token after login
// what we need to do is to mark jwt token disabled.

export const login = async (params: UserParams, i18n: I18nType): Promise<{ token: string; reset: boolean }> => {
  const { email, password } = params;
  let locked = false;
  let userId: number;
  let lockTokenStr: string;
  const result = await sequelize.transaction(async (transaction) => {
    let user = await User.findOne({ where: { email }, transaction });
    if (!user) {
      logger.error(`User(${email}) is not found.`);
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }

    if (user.unconfirmed_email) {
      const error = new AuthError(i18n.t('auth.notConfirmed'));
      error.public = true;
      throw error;
    }

    if (!user.enabled) {
      const error = new AuthError(i18n.t('auth.disabledUser'));
      error.public = true;
      throw error;
    }

    if (user.reset_password_token) {
      const error = new AuthError(i18n.t('auth.completePassReset'));
      error.public = true;
      throw error;
    }

    user = await userHelper.checkLockStatus({ user, User, i18n, transaction });

    if (!user) {
      logger.error(`Checked user(${email}) is not found.`);
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }

    const getToken = async () => {
      return await userHelper.createJwtToken({
        id: user!.id,
        type: 'user',
        transaction,
        UserToken,
      });
    };

    const trackLogin = async (extraInfo?: string) => {
      if (config.auth.traceLogin) {
        await UserLoginHistory.create(
          {
            node_env: config.nodeEnv,
            app_env: config.appEnv,
            email: user!.email,
            ip: params.ip,
            user_agent: params.userAgent,
            referer: params.referer,
            device_type: params.client?.deviceType,
            os: params.client?.os,
            browser: params.client?.browser,
            timezone: params.client?.timeZone,
            other: extraInfo || null,
          },
          { transaction },
        );
      }
    };

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
        const lockToken = await getToken();
        lockTokenStr = lockToken;
        user.locked_at = dayjs.utc().format();
        user.unlock_token = lockToken;
        locked = true;
        userId = user.id;
        await trackLogin('Locked');
      }
      await user.save({ transaction });
      return null;
    }

    await trackLogin();

    let reset = false;
    if (config.auth.checkExpiredPass) {
      if (user.last_change_pass_at) {
        reset = dayjs.utc(user.last_change_pass_at).add(config.auth.passwordResetCycle, 'day').isBefore(dayjs.utc());
      } else {
        reset = true;
      }
    }

    const token = await getToken();

    if (reset) {
      user.reset_password_token = token;
      await user.save({ transaction });
    } else {
      await UserToken.destroy({
        where: {
          user_id: user.id,
          expired_at: {
            [Op.lte]: dayjs.utc().format(),
          },
        },
        transaction,
      });
      user.latest_sign_in_token = token;
      await user.save({ transaction });
    }

    return {
      token,
      reset,
    };
  });

  if (!result) {
    if (locked && config.auth.enableEmailService) {
      // must be placed outside transaction
      await job.enqueue('auth-lock-email', { name: 'Locking Account Email', type: 'Job', userId: userId!, userType: 'user', parameter: { origin: params.origin, token: lockTokenStr!, email } });
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
  origin: string;
};

export const register = async (params: RegisterParams, i18n: I18nType) => {
  const { email, displayName, password, origin } = params;

  if (zxcvbn(password).score < 2) {
    const error = new AuthError(i18n.t('auth.weekPassword', { password: randomPassword() }));
    error.public = true;
    throw error;
  }

  let userId: number;
  let tokenStr: string;
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

    const user = await User.create(
      {
        email,
        password,
        unconfirmed_email: email,
        last_change_pass_at: dayjs.utc().format(),
      },
      {
        transaction,
      },
    );

    const token = await userHelper.createJwtToken({
      id: user.id,
      type: 'user',
      transaction,
      UserToken,
    });
    tokenStr = token;
    user.confirmation_token = token;

    userId = user.id;
    await Promise.all([
      UserProfile.create(
        {
          user_id: userId,
          display_name: displayName,
        },
        {
          transaction,
        },
      ),
      user.save({ transaction }),
    ]);
  });

  // must be placed outside transaction
  if (config.auth.enableEmailService) {
    await job.enqueue('auth-confirmation-email', { name: 'Register Account Email', type: 'Job', userId: userId!, userType: 'user', parameter: { origin, token: tokenStr!, email }});
  }

  return true;
};

export const forgotPassword = async ({ email, origin }: { email: string; origin?: string }, i18n: I18nType) => {
  let userId: number;
  let tokenStr: string;
  await sequelize.transaction(async (transaction) => {
    let user = await User.findOne({ where: { email }, transaction });
    if (!user) {
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }
    userId = user.id;
    user = await userHelper.checkLockStatus({ user, transaction, i18n, User });

    if (!user) {
      throw new AuthError(i18n.t('auth.notFoundEmail', { email }));
    }

    const token = await userHelper.createJwtToken({
      id: user.id,
      type: 'user',
      transaction,
      UserToken,
    });
    tokenStr = token;
    await user.update(
      {
        reset_password_token: token,
      },
      {
        transaction,
      },
    );
  });

  // must be placed outside transaction
  if (config.auth.enableEmailService) {
    await job.enqueue('auth-forgot-email', { name: 'Forgotten Password Email', type: 'Job', userId: userId!, userType: 'user', parameter: { origin, token: tokenStr!, email } });
  }
};

interface ResetParams {
  password: string;
  token: string;
}
export const resetPassword = async (params: ResetParams, i18n: I18nType) => {
  const id = await userHelper.verfyJwtToken({ token: params.token, UserToken });

  await sequelize.transaction(async (transaction) => {
    const user = await User.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!user) {
      throw new DataError(i18n.t('auth.notFoundUser'));
    }

    if (user.reset_password_token !== params.token) {
      const error = new DataError(i18n.t('auth.invalidToken'));
      error.public = true;
      throw error;
    }

    if (await util.password.isPasswordEqual(params.password, user.password)) {
      const error = new LogicError(i18n.t('auth.notSupportSamePassword'));
      error.public = true;
      throw error;
    }

    if (user.reset_password_token) {
      await UserToken.destroy({
        where: {
          user_id: user.id,
          signature: getJwtTokenSignature(user.reset_password_token),
        },
        transaction,
      });
    }

    user.password = params.password;
    user.reset_password_token = null;
    user.reset_password_sent_at = null;
    user.last_change_pass_at = dayjs.utc().format();
    await user.save({ transaction });
  });

  return true;
};

export const unlockUser = async (params: { token: string }, i18n: I18nType) => {
  const id = await userHelper.verfyJwtToken({ token: params.token, UserToken });

  await sequelize.transaction(async (transaction) => {
    const user = await User.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!user) {
      throw new DataError(i18n.t('auth.notFoundUser'));
    }

    if (user.unlock_token !== params.token) {
      const error = new DataError(i18n.t('auth.invalidToken'));
      error.public = true;
      throw error;
    }

    if (user.unlock_token) {
      await UserToken.destroy({
        where: {
          user_id: user.id,
          signature: getJwtTokenSignature(user.unlock_token),
        },
        transaction,
      });
    }

    user.unlock_token = null;
    user.locked_at = null;
    user.failed_attempts = 0;
    await user.save({ transaction });
  });

  return true;
};

export const confirmUser = async (params: { token: string }, i18n: I18nType) => {
  const id = await userHelper.verfyJwtToken({ token: params.token, UserToken });

  await sequelize.transaction(async (transaction) => {
    const user = await User.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!user) {
      throw new DataError(i18n.t('auth.notFoundUser'));
    }

    if (user.confirmation_token !== params.token) {
      const error = new DataError(i18n.t('auth.invalidToken'));
      error.public = true;
      throw error;
    }

    if (user.confirmation_token) {
      await UserToken.destroy({
        where: {
          user_id: user.id,
          signature: getJwtTokenSignature(user.confirmation_token),
        },
        transaction,
      });
    }

    user.confirmation_token = null;
    user.confirmed_at = dayjs.utc().format();
    user.unconfirmed_email = null;
    await user.save({ transaction });
  });

  return true;
};

export const logoutUser = async (params: { id: number; type: string }, token: string, i18n: I18nType) => {
  await sequelize.transaction(async (transaction) => {
    if (params.type === 'user') {
      const user = await User.findOne({
        attributes: ['id', 'latest_sign_in_token'],
        where: {
          id: params.id,
        },
        transaction,
      });

      if (!user) {
        throw new DataError(i18n.t('auth.notFoundUser'));
      }

      await UserToken.destroy({
        where: {
          user_id: user.id,
          signature: getJwtTokenSignature(token),
        },
        transaction,
      });

      if (user.latest_sign_in_token === token) {
        user.latest_sign_in_token = null;
      }
      await user.save({ transaction });
    } else if (params.type === 'oauth2') {
      await OAuth2UserToken.destroy({
        where: {
          user_id: params.id,
          signature: getJwtTokenSignature(token),
        },
        transaction,
      });
    }
  });
};
