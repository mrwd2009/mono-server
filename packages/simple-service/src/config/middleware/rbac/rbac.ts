// TODO complete this middleware
import Koa, { Middleware } from 'koa';
import config from '../../config';
import * as lib from '../../../lib';
import permissions from './permissions';
import './gateway-checker';
import './oauth2-checker';
import { PermissionKeys, executeCheckers, AfterChecker, checkerMiddleware } from './checker';

const {
  error: { ForbiddenError },
} = lib;

export { permissions };

declare module 'koa' {
  interface DefaultContext {
    _rbacAfterChecker?: AfterChecker;
    getRbacPermissions?: () => Promise<Array<number>>;
    rbacPermissions?: Array<number>;
  }
}

export const checkPermission = (permissionKey: PermissionKeys): Middleware => {
  return async (context, next) => {
    // skip checking in development mode.
    if (config.isDev) {
      return await next();
    }

    const permissionId = permissions[permissionKey];
    if (permissionId) {
      const result = await executeCheckers(context.state.user, permissionKey);
      if (result?.passed) {
        context.rbacPermissions = result?.permissions;
        context._rbacAfterChecker = result?.afterChecker;
        return await next();
      }
      throw new ForbiddenError('Forbidden request!');
    } else {
      throw new ForbiddenError('Invalid permission!');
    }
  };
};

const adminR = checkPermission('Admin.Read');
const adminW = checkPermission('Admin.Write');
const generalR = checkPermission('General.Read');
const generalW = checkPermission('General.Write');
const advancedR = checkPermission('Advanced.Read');
const advancedW = checkPermission('Advanced.Write');

export { adminR, adminW, generalR, generalW, advancedR, advancedW };

export const initialize = async (app: Koa): Promise<void> => {
  await app.use(checkerMiddleware);
};

export default initialize;
