// it should be dynamic from server side
// import { rbacCodes } from './rbac';
import find from 'lodash/find';
import filter from 'lodash/filter';

const routerList = [
  {
    title: 'Dashboard(todo)',
    key: 'dashboard',
    pathname: '/todo/dashboard',
    rbacCode: '',
    menu: true, // display on top navigation
  },
  {
    title: 'Nav2(todo)',
    key: 'nav2todo',
    pathname: '/todo/nav2',
    rbacCode: '',
    menu: true, // display on top navigation
  },
  {
    key: 'Nav3(todo)',
    pathname: '/todo/nav3',
    rbacCode: '',
  },
  {
    title: 'Nav4(todo)',
    key: 'nav4todo',
    pathname: '/todo/nav4',
    rbacCode: '',
    badge: {
      field: 'todofield',// field for result from useGlobalInfo hook
      type: 'danger',
    },
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

export default routerList;
