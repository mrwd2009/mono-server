import { Middleware, DefaultContext } from 'koa';
import permissions from './permissions';

export type PermissionKeys = keyof typeof permissions;

export type AfterChecker = (context: DefaultContext) => Promise<void>;

export interface CheckerResult {
  passed: boolean;
  permissions?: Array<number>;
  afterChecker?: AfterChecker;
}

export type Checker = (
  user: {
    id: number;
    type: string;
    email: string;
  },
  permissionKey: PermissionKeys,
) => Promise<CheckerResult>;
export const checkerList: Checker[] = [];

export const registerChecker = (check: Checker) => {
  checkerList.push(check);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeCheckers = async (payload: any, permissionKey: PermissionKeys) => {
  for (let i = 0; i < checkerList.length; i++) {
    const result = await checkerList[i](payload, permissionKey);
    if (result.passed) {
      return result;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPermissionsMethodMap: any = {};

export const registerGetPermissionsMethod = (type: string, method: (id: number) => Promise<Array<number>>) => {
  getPermissionsMethodMap[type] = method;
};

export const checkerMiddleware: Middleware = async (context, next) => {
  context.getRbacPermissions = async (): Promise<Array<number>> => {
    const method = getPermissionsMethodMap[context.state.user.type];
    if (method) {
      return await method(context.state.user.id);
    }
    return [];
  };

  await next();

  const afterChecker = context._rbacAfterChecker;
  if (afterChecker) {
    await afterChecker(context);
  }
};

export default checkerMiddleware;
