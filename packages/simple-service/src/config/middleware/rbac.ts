// TODO complete this middleware
import Koa, { Middleware } from 'koa';
import dayjs from 'dayjs';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import config from '../../config';
import * as lib from '../../lib';

const {
  error: { LogicError },
} = lib;

export type Permissions = Array<{ code: string; url?: string }>;

// add a cache to be allowed to save items with fixed max count.
export const getAllAPIPermissions = async (): Promise<Permissions> => {
  return [
    { code: '9b667fd9', url: 'POST /api/auth/logout' },
    { code: 'bce2016e', url: 'ALL /api/auth' },
    { code: 'f7a864ba', url: 'ALL /api/deploy' },
  ];
};

export const getUrlPermission = async (url: string): Promise<string | null> => {
  return 'bce2016e';
};

export const getAPIPermissions = async (email: string): Promise<Array<string>> => {
  return ['f7a864ba'];
};

export const getUIPermissions = async (email: string): Promise<Array<string>> => {
  return ['4b667fd9'];
};

export const isUrlAllowed = async (email: string, url: string): Promise<boolean> => {
  const urlP = await getUrlPermission(url);
  // url without associated permission, perhaps forgot add permission to this url
  if (!urlP) {
    return false;
  }
  const assignedP = await getAPIPermissions(email);
  return _.includes(assignedP, urlP);
};

export const checkRoute: Middleware = async (context, next) => {
  const allowed = await isUrlAllowed(context.originalUrl, context.state.user.email);
  if (allowed) {
    await next();
  } else {
    throw new LogicError('Permission denied to call api.');
  }
};

export const initialize = async (): Promise<void> => {
  return;
};

export default initialize;
