import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray';

export interface RouteInfo {
  title?: string;
  key: string;
  path: string;
  menu: boolean;
  icon?: string;
  children?: RouteInfo[],
};

// Software Quality Control:
// "The function of software quality that checks that the project follows its standards, processes, and procedures, and that the project produces the required internal and external (deliverable) products"

// Software Quality Assurance:
// "The function of software quality that assures that the standards, processes, and procedures are appropriate for the project and are correctly implemented"

const routesInfo: RouteInfo[] = [
  {
    title: 'Participant',
    key: 'participant',
    path: '/participant',
    icon: 'participant',
    menu: true,
    children: [
      {
        title: 'Buyer',
        key: 'buyer',
        path: '/participant/buyer',
        menu: true,
      },
      {
        title: 'Seller',
        key: 'Seller',
        path: '/participant/seller',
        menu: true,
      }
    ]
  },
  {
    title: 'Contract',
    key: 'contract',
    path: '/contract',
    menu: true,
  },
  {
    title: 'Debug',
    key: 'debug',
    path: '/debug',
    menu: true,
    children: [
      {
        title: 'Config',
        key: 'config',
        path: '/debug/config',
        menu: true,
      },
      {
        title: 'Result',
        key: 'result',
        path: '/debug/result',
        menu: true,
      },
      {
        title: 'Quick Batch',
        key: 'quick-batch',
        path: '/debug/quick-batch',
        menu: true,
      },
      {
        title: 'Compute Node',
        key: 'compute-node',
        path: '/debug/compute-node',
        menu: true,
      }
    ]
  },
  {
    title: 'Report',
    key: 'report',
    path: '/report',
    menu: true,
    children: [
      {
        title: 'Quality Assurance',
        key: 'qa',
        path: '/report/qa',
        menu: true,
      },
      {
        title: 'Quality Control',
        key: 'qc',
        path: '/report/qc',
        menu: true,
      },
      {
        title: 'Contract Design',
        key: 'contract-design',
        path: '/report/contract-design',
        menu: true,
      },
      {
        title: 'Gas Reading',
        key: 'gas-reading',
        path: '/report/gas-reading',
        menu: true,
      },
      {
        title: 'Electricity Reading',
        key: 'electricity-reading',
        path: '/report/electricity-reading',
        menu: true,
      },
      {
        title: 'Custom Report',
        key: 'custom',
        path: '/report/custom',
        menu: true,
      },
      {
        title: 'Bill Detail',
        key: 'bill-detail',
        path: '/report/bill-detail',
        menu: true,
      },
      {
        title: 'Bill Impact',
        key: 'bill-impact',
        path: '/report/bill-impact',
        menu: true,
      }
    ],
  },
  {
    title: 'Queue',
    key: 'queue',
    path: '/queue',
    menu: true,
    children: [
      {
        title: 'Download',
        key: 'download',
        path: '/queue/download',
        menu: true,
      },
      {
        title: 'Task',
        key: 'task',
        path: '/queue/task',
        menu: true,
      },
    ]
  },
  {
    title: 'Administration',
    key: 'admin',
    path: '/admin',
    menu: true,
    children: [
      {
        title: 'Contract Owner',
        key: 'contract-owner',
        path: '/admin/contract-owner',
        menu: true,
      },
      {
        title: 'Contract Dictionary',
        key: 'dictionary',
        path: '/admin/dictionary',
        menu: true,
      },
      {
        title: 'Contract Attribute',
        key: 'attribute',
        path: '/admin/attribute',
        menu: true,
      },
      {
        title: 'Contract Reference Table',
        key: 'reference-table',
        path: '/admin/reference-table',
        menu: true,
      },
      {
        title: 'Billing Cycle',
        key: 'billing-cycle',
        path: '/admin/billing-cycle',
        menu: true,
      },
      {
        title: 'Price Upload',
        key: 'price-upload',
        path: '/admin/price-upload',
        menu: true,
      },
    ]
  },
  {
    title: 'Monitoring',
    key: 'monitoring',
    path: '/monitoring',
    menu: true,
    children: [
      {
        title: 'Event',
        key: 'event',
        path: '/monitoring/event',
        menu: true,
      },
      {
        title: 'Error',
        key: 'Error',
        path: '/monitoring/Error',
        menu: true,
      },
    ]
  },
  {
    title: 'System',
    key: 'system',
    path: '/system',
    menu: true,
    children: [
      {
        title: 'User',
        key: 'user',
        path: '/system/user',
        menu: true,
      },
      {
        title: 'Role',
        key: 'role',
        path: '/system/role',
        menu: true,
      },
      {
        title: 'Permission',
        key: 'permission',
        path: '/system/permission',
        menu: true,
      },
      {
        title: 'Setting',
        key: 'setting',
        path: '/system/setting',
        menu: true,
      },
    ]
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

export interface RouteMenuInfo {
  title: string;
  key: string;
  path: string;
  icon?: string;
  children?: RouteMenuInfo[],
};

export const getRoutesMenu = (routes = routesInfo) => {
  let newRoutes: RouteMenuInfo[] = [];
  forEach(routes, routeInfo => {
    let newRouteInfo: RouteMenuInfo = {
      title: routeInfo.title!,
      key: routeInfo.key,
      icon: routeInfo.icon,
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

export interface RouteBCInfo {
  title: string;
  key: string;
  path: string;
};

export const getRouteBC = (path: string, routes = routesInfo): RouteBCInfo[] => {
  let bcList: RouteBCInfo[] = [];

  forEach(routes, routeInfo => {
    if (path.includes(routeInfo.path)) {
      if (path === routeInfo.path) {
        bcList.push({
          title: routeInfo.title!,
          key: routeInfo.key,
          path: routeInfo.path,
        });
      } else if (routeInfo.children?.length) {
        const subBCList = getRouteBC(path, routeInfo.children);
        bcList = bcList.concat({
          title: routeInfo.title!,
          key: routeInfo.key,
          path: routeInfo.path,
        }, subBCList);
      }
      return false;
    }
  });

  return bcList;
};


export default routesInfo;