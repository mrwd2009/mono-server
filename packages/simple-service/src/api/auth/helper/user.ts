import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import config from '../../../config/config';
import * as lib from '../../../lib';

const {
  error: {
    GatewayError,
  },
} = lib;

export const createJwtToken = async (email: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    if (!config.jwt.secret) {
      throw new GatewayError('JWT secret is required.');
    }
    const callback: jwt.SignCallback = (error, token) => {
      if (error) {
        return reject(error);
      }
      if (!token) {
        return reject(new GatewayError('Empty jwt token.'));
      }
      return resolve(token);
    };
    jwt.sign({
      sub: email,
      exp: dayjs().add(config.jwt.expireHour, 'hours').unix(),
    }, config.jwt.secret, {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience,
    }, callback);
  });
};