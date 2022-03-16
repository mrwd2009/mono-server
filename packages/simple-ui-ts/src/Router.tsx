import { FC, memo } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { Login } from './views/Auth'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

const Router: FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default memo(Router);