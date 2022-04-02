import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { Transaction } from '@sequelize/core'
import config from '../../../config/config';
import { UserModel, UserModelDef, UserTokenModelDef } from '.././../../model/types';
import * as lib from '../../../lib';
import { I18nType } from '../../../types';
import { AuthError } from '../../../lib/error';

const {
  error: { GatewayError },
} = lib;

interface TokenParams {
  id: number;
  type: 'user';
  transaction: Transaction;
  UserToken: UserTokenModelDef;
}
export const createJwtToken = async (params: TokenParams): Promise<string> => {
  const expiredDate = dayjs.utc().add(config.jwt.expireHour, 'hours');

  const createdToken = await new Promise<string>((resolve, reject) => {
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
    jwt.sign(
      {
        sub: JSON.stringify({ id: params.id, type: params.type }),
        exp: expiredDate.unix(),
      },
      config.jwt.secret,
      {
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
      },
      callback,
    );
  });

  await params.UserToken.create({
    user_id: params.id,
    token: createdToken,
    status: 'enabled',
    expired_at: expiredDate.format(),
  }, {
    transaction: params.transaction
  });

  return createdToken;
};

interface CheckParams {
  user: UserModel;
  transaction: Transaction;
  i18n: I18nType;
  User: UserModelDef;
}
export const checkLockStatus = async ({user, transaction, i18n, User}: CheckParams) => {
  const {
    auth: {
      autoUnlockTime,
    }
  } = config;
  const lockedUser = await User.findOne({
    where: {
      id: user.id
    },
    transaction,
    lock: transaction.LOCK.UPDATE
  });

  if (!lockedUser) {
    return null;
  }

  if (lockedUser.locked_at) {
    const unlockTime = dayjs.utc(lockedUser.locked_at).add(autoUnlockTime, 'minute');
    const now = dayjs.utc();
    if (unlockTime.isAfter(now)) {
      const minutes = Math.ceil((unlockTime.unix() - now.unix()) / 60 );
      const error = new AuthError(i18n.t('auth.lockedMessage', { count: minutes }));
      error.public = true;
      throw error;
    }
    // clear lock status
    await lockedUser.update(
      {
      failed_attempts: 0,
      locked_at: null,
      unlock_token: null,
      },
      {
        transaction,
      }
    );
  }

  return lockedUser;
};