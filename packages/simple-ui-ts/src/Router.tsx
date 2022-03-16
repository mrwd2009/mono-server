import { FC, memo } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { Login } from './views/Auth';
import ErrorPageLayout from './layouts/ErrorPageLayout';
import { NotFound, Forbidden } from './views/ErrorPage';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ErrorPageLayout />,
    children: [
      {
        path: '/403',
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