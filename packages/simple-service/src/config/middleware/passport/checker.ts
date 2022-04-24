import { Middleware, DefaultContext } from 'koa';
import _ from 'lodash';
import config from '../../config';

export type AfterChecker = (context: DefaultContext) => Promise<void>;

export interface CheckerResult {
  passed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity?: any;
  afterChecker?: AfterChecker;
}

export const canExtendSession = (context: DefaultContext) => {
  if (!config.auth.session.autoExtend) {
    return false;
  }

  if (context.skipSessionExtend) {
    return false;
  }

  if (_.includes(context.path, config.auth.session.ignoredRoute)) {
    return false;
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Checker = (
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
