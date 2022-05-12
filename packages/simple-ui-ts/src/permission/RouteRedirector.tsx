import { FC, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { usePermission } from '../hooks';
import { getRouteInfo, forEachRouteInfo, RouteInfo } from '../config/routes-info';

const RouteRedirector: FC = () => {
  const { hasPermission } = usePermission();

  const contractRoute = getRouteInfo('contract');
  if (!contractRoute!.permission || hasPermission(contractRoute!.permission)) {
    return (
      <Navigate
        to={contractRoute!.path}
        replace
      />
    );
  }

  let targetRoute: RouteInfo;

  forEachRouteInfo((routeInfo) => {
    if (routeInfo.menu) {
      if (!routeInfo.permission || hasPermission(routeInfo.permission)) {
        targetRoute = routeInfo;
        return false;
      }
    }
  });

  if (targetRoute!) {
    return (
      <Navigate
        to={targetRoute!.path}
        replace
      />
    );
  }

  return (
    <Navigate
      to={getRouteInfo('403')!.path}
      replace
    />
  );
};

export default memo(RouteRedirector);
