import Router from '@koa/router';

// routers needed to check identification.
const authenticatedRouters: Array<Router> = [];

export const registerRouter = (router: Router) => {
  authenticatedRouters.push(router);
};

export const getRouters = (): Router[] => {
  return authenticatedRouters.slice();
};

// public routers

const publicRouters: Array<Router> = [];

export const registerPublicRouter = (router: Router) => {
  publicRouters.push(router);
};

export const getPublicRouters = (): Router[] => {
  return publicRouters.slice();
};
