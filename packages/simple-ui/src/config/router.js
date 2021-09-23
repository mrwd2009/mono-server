// it should be dynamic from server side
// import { rbacCodes } from './rbac';
import find from 'lodash/find';
import filter from 'lodash/filter';

const routerList = [
  {
    title: 'Service',
    key: 'service',
    pathname: '/service',
    rbacCode: '',
    menu: true, // display on top navigation
  },
  {
    title: 'Server',
    key: 'agent',
    pathname: '/agent',
    rbacCode: '',
    menu: true, // display on top navigation
  },
  {
    title: 'Deployment',
    key: 'deployment',
    pathname: '/deployment',
    rbacCode: '',
    menu: true, // display on top navigation
  },
  {
    key: 'login',
    pathname: '/login',
    menu: false,
  },
  {
    key: 'register',
    pathname: '/register',
    menu: false,
  },
  {
    key: 'forgotPass',
    pathname: '/password/forgot',
    menu: false,
  },
  {
    key: 'resetPass',
    pathname: '/passwordreset',
    menu: false,
  },
];

export const getRouter = (routerKey) => {
  const config = find(routerList, { key: routerKey });
  return config || null;
};

// items for navigation
export const menuList = filter(routerList, 'menu');

export const homePath = getRouter('service').pathname;

export default routerList;
