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

const UserModel = models.User;

type UserParams = {
  Email: string;
  Password: string;
};

const login = async (params: UserParams): Promise<{ token: string; user: string }> => {
  const { Email, Password } = params;
  const user = await UserModel.findByPk(Email);
  if (!user) {
    logger.error(`User(${Email}) is not found.`);
    throw new AuthError('Incorrect username or password');
  }
  if (!(await util.password.isPasswordEqual(Password, user.Password))) {
    logger.error(`Incorrect password(${Password}) of User(${Email}).`);
    throw new AuthError('Incorrect username or password');
  }

  const token = await userHelper.createJwtToken(params.Email);
  return {
    token,
    user: params.Email,
  };
};

export { login };
