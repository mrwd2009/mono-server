import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import config from '../../../config';
import { userHelper } from '../helper';
import * as lib from '../../../lib';

const {
  error: {
    BackendError,
  }
} = lib;

type UserParams = {
  username: string,
  password: string,
};

const login = async (params: UserParams): Promise<{token: string, username: string}> => {
  const token = await userHelper.createJwtToken(params.username);
  return {
    token,
    username: params.username,
  };
};

export {
  login,
};
