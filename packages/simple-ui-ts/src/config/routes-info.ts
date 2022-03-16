import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray';

interface RouteInfo {
  title?: string;
  key: string;
  path: string;
  menu: boolean;
  children?: RouteInfo[],
};

const routesInfo: RouteInfo[] = [
  {
    title: 'Contract',
    key: 'contract',
    path: '/contract',
    menu: true,
  },
  {
    key: 'login',
    path: '/login',
    menu: false,
  },
  {
    key: 'register',
    path: '/registrations/new',
    menu: false,
  },
  {
    key: 'forgot-password',
    path: '/forgot-password/new',
    menu: false,
  },
  {
    key: 'reset-password',
    path: '/reset-password',
    menu: false,
  },
  {
    key: '403',
    path: '/403',
    menu: false,
  }
];

export const getRouteInfo = (keys: string | string[], routes = routesInfo) => {
  let restKeys: string[] = [];
  let currentKey: string = '';
  if (isArray(keys)) {
    currentKey = keys[0];
    restKeys = keys.slice(1);
  } else {
    currentKey = keys;
  }

  let info: RouteInfo | undefined;
  forEach(routes, routeInfo => {
    if (routeInfo.key === currentKey) {
      if (restKeys.length) {
        if (routeInfo.children?.length) {
          info = getRouteInfo(restKeys, routeInfo.children);
        }
      } else {
        info = routeInfo;
      }
      return false;
    }
  });
  return info;
};

interface RouteMenuInfo {
  title: string;
  key: string;
  path: string;
  children?: RouteMenuInfo[],
};

export const getRoutesMenu = (routes = routesInfo) => {
  let newRoutes: RouteMenuInfo[] = [];
  forEach(routes, routeInfo => {
    let newRouteInfo: RouteMenuInfo = {
      title: routeInfo.title!,
      key: routeInfo.key,
      path: routeInfo.path,
    };
    if (routeInfo.menu) {
      newRoutes.push(newRouteInfo)
    }
    if (routeInfo.children?.length) {
      const newChildren = getRoutesMenu(routeInfo.children);
      if (newChildren.length) {
        newRouteInfo.children = newChildren;
      }
    }
  });
  return newRoutes;
};


export default routesInfo;