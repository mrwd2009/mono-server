import { Middleware, DefaultContext } from 'koa';
import _ from 'lodash';
import dayjs from 'dayjs';
import appDBs from '../../model/app';
import config from '../../config';
import { UserTokenModel, UserTokenModelDef } from '../../../model/types';
import { AuthError } from '../../../lib/error';
import { gatewayJwt } from '../../../lib/util';
import { getCookieOptions } from '../../../lib/util/cookie';
const {
  gateway: { sequelize },
} = appDBs;

export type AfterChecker = (context: DefaultContext) => Promise<void>;

export interface CheckerResult {
  passed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity?: any;
  afterChecker?: AfterChecker;
}

export interface CachedUser {
  id?: number;
  email?: string;
  tokenId?: number;
  tokenExpiredAt?: string;
}

export const canExtendSession = (context: DefaultContext) => {
  if (!config.auth.session.autoExtend) {
    return false;
  }

  if (context.skipSessionExtend) {
    return false;
  }

  // it's an auto refresh request from client
  if (context.mergedParams?._refresh) {
    return false;
  }

  if (_.includes(context.path, config.auth.session.ignoredRoute)) {
    return false;
  }

  return true;
};

const extendToken = async (tokenId: number, UserToken: UserTokenModelDef) => {
  return await sequelize.transaction(async (transaction) => {
    const tokenRecord = await UserToken.findOne({
      attributes: ['id', 'user_id', 'child_token_id'],
      where: {
        id: tokenId,
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!tokenRecord) {
      throw new AuthError('Invalid token.');
    }

    if (tokenRecord.child_token_id) {
      const createdRecord = await UserToken.findOne({
        attributes: ['id', 'token'],
        where: {
          id: tokenRecord.child_token_id,
        },
        transaction,
      });
      if (!createdRecord) {
        throw new AuthError('Invalid token.');
      }
      return createdRecord.token;
    }

    const newTokenRecord = await gatewayJwt.createToken({
      id: tokenRecord.user_id,
      type: 'user',
      transaction,
      UserToken,
    });

    newTokenRecord.parent_token_id = tokenRecord.id;
    tokenRecord.child_token_id = newTokenRecord.id;

    await Promise.all([tokenRecord.save({ transaction }), newTokenRecord.save({ transaction })]);

    return newTokenRecord.token;
  });
};

export const extendSession = async (
  context: DefaultContext,
  tokenObj: { id: number, expiredAt: string },
  UserToken: UserTokenModelDef,
) => {
  if (!canExtendSession(context)) {
    return;
  }

  const extendDate = dayjs.utc(tokenObj.expiredAt).subtract(config.auth.session.restHour, 'hour');
  const currentDate = dayjs.utc();
  if (currentDate.isAfter(extendDate)) {
    const newToken = await extendToken(tokenObj.id, UserToken);
    context.cookies.set(
      config.jwt.cookieKey,
      newToken,
      getCookieOptions({
        httpOnly: true,
        maxAge: config.jwt.expireHour * 3600 * 1000,
        signed: true,
      }),
    );
  }
};

export type Checker = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  token: string,
) => Promise<{ passed: boolean; entity?: { id: string | number; email: string }; afterChecker?: AfterChecker }>;
export const checkerList: Checker[] = [];

export const registerChecker = (check: Checker) => {
  checkerList.push(check);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeCheckers = async (payload: any, token: string) => {
  for (let i = 0; i < checkerList.length; i++) {
    const result = await checkerList[i](payload, token);
    if (result.passed) {
      return result;
    }
  }
};

export const checkerMiddleware: Middleware = async (context, next) => {
  await next();

  const afterChecker = context._passportAfterChecker;
  if (afterChecker) {
    await afterChecker(context);
  }
};

export default checkerMiddleware;
