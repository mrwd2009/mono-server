import { FC, memo } from 'react';
import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import { getRouteInfo } from './config/routes-info';
import { Login } from './views/Auth';
import ErrorPageLayout from './layouts/ErrorPageLayout';
import { NotFound, Forbidden } from './views/ErrorPage';
import MainLayout from './layouts/MainLayout';
import { RouteGuarder } from './permission';
import { Contract } from './views/Contract';

const defaultPath = getRouteInfo('contract')!.path;

const routes: RouteObject[] = [
  {
    path: getRouteInfo('login')!.path,
    element: <Login />,
  },
  {
    element: <RouteGuarder />,
    children: [
      { 
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to={defaultPath} replace />,
          },
          {
            path: defaultPath,
            element: <Contract />
          }
        ]
      }
    ]
  },
  {
    element: <ErrorPageLayout />,
    children: [
      {
        path: getRouteInfo('403')!.path,
        element: <Forbidden />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

const Router: FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default memo(Router);