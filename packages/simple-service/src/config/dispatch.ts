import Koa from 'koa';
import Router from '@koa/router';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { passport } from './middleware';
import { getPublicRouters, getRouters } from './router';

// load each module router automatically.
// because we don't want to change this file during adding new module
const loadModuleRouter = () => {
  const modulePath = path.join(__dirname, '..', 'api');
  const list = fs.readdirSync(modulePath, { encoding: 'utf-8', withFileTypes: true });
  _.forEach(list, (entity) => {
    if (entity.isDirectory()) {
      const moduleContents = fs.readdirSync(path.join(modulePath, entity.name), { encoding: 'utf-8' });
      // load index.ts
      if (_.some(moduleContents, (name) => _.startsWith(name, 'index.'))) {
        require(path.join(modulePath, entity.name, 'index'));
      }
    }
  });
};

loadModuleRouter();

const commonPrefix = '/api';

const publicRouter = new Router({
  prefix: commonPrefix,
});
const authCheckingRouter = new Router({
  prefix: commonPrefix,
}).use(passport.jwtAuth);

const dispatch = async (app: Koa): Promise<void> => {
  _.forEach(getPublicRouters(), (router) => {
    publicRouter.use(router.routes());
  });
  // including authentication checking logic
  _.forEach(getRouters(), (router) => {
    authCheckingRouter.use(router.routes());
  });

  app.use(publicRouter.routes()).use(authCheckingRouter.routes());
};

export default dispatch;
