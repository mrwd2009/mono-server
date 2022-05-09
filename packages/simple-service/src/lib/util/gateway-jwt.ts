import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { Transaction } from '@sequelize/core';
import { UserTokenModelDef } from '../../model/types';
import config from '../../config/config';
import { getJwtTokenSignature } from './common';
import { GatewayError, DataError } from '../error';

interface TokenParams {
  id: number;
  type: 'user' | 'oauth2';
  UserToken: UserTokenModelDef;
  transaction?: Transaction;
  expireHour?: number;
  secret?: string;
  issuer?: string;
  audience?: string;
}
export const createToken = async (params: TokenParams) => {
  const expireHour = params.expireHour || config.jwt.expireHour;
  const secret = params.secret || config.jwt.secret;
  const issuer = params.issuer || config.jwt.issuer;
  const audience = params.audience || config.jwt.audience;

  const expiredDate = dayjs.utc().add(expireHour, 'hours');

  const createdToken = await new Promise<string>((resolve, reject) => {
    if (!secret) {
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
    // Both Base64 and Base64url
    // so signature includes underscore
    jwt.sign(
      {
        sub: params.id,
        type: params.type,
        exp: expiredDate.unix(),
      },
      secret,
      {
        issuer: issuer,
        audience: audience,
      },
      callback,
    );
  });

  const tokenRecord = await params.UserToken.create(
    {
      user_id: params.id,
      signature: getJwtTokenSignature(createdToken),
      token: createdToken,
      status: 'enabled',
      expired_at: expiredDate.format(),
    },
    {
      transaction: params.transaction,
    },
  );

  return tokenRecord;
};

interface VerifyParams {
  token: string;
  UserToken: UserTokenModelDef;
  transaction?: Transaction;
  secret?: string;
  issuer?: string;
  audience?: string;
}
export const verfyToken = async (params: VerifyParams) => {
  const secret = params.secret || config.jwt.secret;
  const issuer = params.issuer || config.jwt.issuer;
  const audience = params.audience || config.jwt.audience;
  const result: {
    type: TokenParams['type'];
    id: number;
  } = await new Promise((resolve, reject) => {
    jwt.verify(
      params.token,
      secret!,
      {
        issuer,
        audience,
      },
      (error, decoded) => {
        if (error) {
          return reject(error);
        }
        if (decoded) {
          resolve({
            id: (decoded as unknown as { sub: number }).sub,
            type: (decoded as unknown as { type: TokenParams['type'] }).type,
          });
        } else {
          reject(new GatewayError('Empty jwt token.'));
        }
      },
    );
  });

  if (result.type !== 'user') {
    throw new DataError('Invalid token.');
  }

  const tokenRecord = await params.UserToken.findOne({
    attributes: ['id'],
    where: {
      user_id: result.id,
      signature: getJwtTokenSignature(params.token),
      status: 'enabled',
    },
    transaction: params.transaction,
  });

  if (!tokenRecord) {
    throw new DataError('Invalid token.');
  }

  return result.id;
};
