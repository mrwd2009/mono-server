import { userHelper } from '../helper';
import * as lib from '../../../lib';
import appDBs from '../../../config/model/app';

const {
  error: { AuthError },
  util,
  logger,
} = lib;
const {
  main: { models },
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

export const register = async (params: RegisterParams) => {

  return;
}

