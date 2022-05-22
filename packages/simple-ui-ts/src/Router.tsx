import { FC, memo } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { getRouteInfo } from './config/routes-info';
import { Login, Register, ForgotPassword, ResetPassword, ConfirmAccount, UnlockAccount } from './views/Auth';
import ErrorPageLayout from './layouts/ErrorPageLayout';
import { NotFound, Forbidden } from './views/ErrorPage';
import MainLayout from './layouts/MainLayout';
import { RouteGuarder, RouteRedirector } from './permission';
import { Contract } from './views/Contract';
import { Setting, User, LoginHistory, Permission, Role, OAuth2User, Log } from './views/System';
import { Dashboard } from './views/Debug';

const defaultPath = getRouteInfo('contract')!.path;

const routes: RouteObject[] = [
  {
    path: getRouteInfo('login')!.path,
    element: <Login />,
  },
  {
    path: getRouteInfo('register')!.path,
    element: <Register />,
  },
  {
    path: getRouteInfo('forgot-password')!.path,
    element: <ForgotPassword />,
  },
  {
    path: getRouteInfo('reset-password')!.path,
    element: <ResetPassword />,
  },
  {
    path: getRouteInfo('confirm-account')!.path,
    element: <ConfirmAccount />,
  },
  {
    path: getRouteInfo('unlock-account')!.path,
    element: <UnlockAccount />,
  },
  {
    element: <RouteGuarder />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <RouteRedirector />,
          },
          {
            path: defaultPath,
            element: <Contract />,
          },
          {
            path: getRouteInfo(['system', 'setting'])!.path,
            element: <Setting />,
          },
          {
            path: getRouteInfo(['system', 'user'])!.path,
            element: <User />,
          },
          {
            path: getRouteInfo(['system', 'oauth2-user'])!.path,
            element: <OAuth2User />,
          },
          {
            path: getRouteInfo(['system', 'login-history'])!.path,
            element: <LoginHistory />,
          },
          {
            path: getRouteInfo(['system', 'permission'])!.path,
            element: <Permission />,
          },
          {
            path: getRouteInfo(['system', 'role'])!.path,
            element: <Role />,
          },
          {
            path: getRouteInfo(['system', 'log', 'access'])!.path,
            element: (
              <Log
                type="info"
                key="info"
              />
            ),
          },
          {
            path: getRouteInfo(['system', 'log', 'error'])!.path,
            element: (
              <Log
                type="error"
                key="error"
              />
            ),
          },
          {
            path: getRouteInfo(['system', 'log', 'crashed'])!.path,
            element: (
              <Log
                type="exception"
                key="exception"
              />
            ),
          },
          {
            path: getRouteInfo(['system', 'log', 'queue'])!.path,
            element: (
              <Log
                type="queue"
                key="queue"
              />
            ),
          },
          {
            path: getRouteInfo(['debug', 'dashboard'])!.path,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    element: <ErrorPageLayout />,
    children: [
      {
        path: getRouteInfo('403')!.path,
        element: <Forbidden />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const Router: FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default memo(Router);
