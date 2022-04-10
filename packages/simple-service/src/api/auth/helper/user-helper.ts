import dayjs from 'dayjs';
import { Transaction } from '@sequelize/core';
import config from '../../../config/config';
import { UserModel, UserModelDef, UserTokenModelDef } from '.././../../model/types';
import { I18nType } from '../../../types';
import { AuthError } from '../../../lib/error';
import { gatewayJwt } from '../../../lib/util';

interface TokenParams {
  id: number;
  type: 'user';
  transaction: Transaction;
  UserToken: UserTokenModelDef;
}
export const createJwtToken = async (params: TokenParams): Promise<string> => {
  return await gatewayJwt.createToken(params);
};

interface VerifyParams {
  token: string;
  UserToken: UserTokenModelDef;
}
export const verfyJwtToken = async (params: VerifyParams) => {
  return await gatewayJwt.verfyToken(params);
};

interface CheckParams {
  user: UserModel;
  transaction: Transaction;
  i18n: I18nType;
  User: UserModelDef;
}
export const checkLockStatus = async ({ user, transaction, i18n, User }: CheckParams) => {
  const {
    auth: { autoUnlockTime },
  } = config;
  const lockedUser = await User.findOne({
    where: {
      id: user.id,
    },
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!lockedUser) {
    return null;
  }

  if (lockedUser.locked_at) {
    const unlockTime = dayjs.utc(lockedUser.locked_at).add(autoUnlockTime, 'minute');
    const now = dayjs.utc();
    if (unlockTime.isAfter(now)) {
      const minutes = Math.ceil((unlockTime.unix() - now.unix()) / 60);
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
      },
    );
  }

  return lockedUser;
};
