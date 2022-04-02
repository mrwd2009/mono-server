import { userHelper } from '../helper';
import zxcvbn from 'zxcvbn';
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
  main: { models },
  gateway: {
    models: {
      User,
      UserProfile,
    },
    sequelize,
  }
} = appDBs;

const UserModel = models.UserS;

type UserParams = {
  email: string;
  password: string;
};

export const login = async (params: UserParams): Promise<{ token: string; user: string }> => {
  const { email, password } = params;
  const user = await UserModel.findByPk(email);
  if (!user) {
    logger.error(`User(${email}) is not found.`);
    throw new AuthError('Incorrect username or password');
  }
  if (!(await util.password.isPasswordEqual(password, user.Password))) {
    logger.error(`Incorrect password(${password}) of User(${email}).`);
    throw new AuthError('Incorrect username or password');
  }

  const token = await userHelper.createJwtToken(params.email);
  return {
    token,
    user: params.email,
  };
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
    throw new AuthError(i18n.t('auth.weekPassword', { password: randomPassword() }))
  }

  let userId: number;
  await sequelize.transaction(async (transaction) => {
    const user = await User.create({
      email,
      password,
      unconfirmed_email: email,
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
  
  if (!config.isDev) {
    await job.enqueue('auth-confirmation-email', { userId: userId! });
  }

  return true;
}

