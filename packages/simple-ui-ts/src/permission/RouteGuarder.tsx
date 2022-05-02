import { FC, memo, useEffect, useMemo } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import useUserInfo from '../views/Auth/hooks/useUserInfo';
import { usePermission } from '../hooks';
import { getRouteInfoByPath, getRouteInfo } from '../config/routes-info';

const RouteGuarder: FC = () => {
  const { loading, loaded, fetchUserInfo, fetchAvatar} = useUserInfo();
  const { hasPermission } = usePermission();
  const { pathname } = useLocation();
  const routeInfo = useMemo(() => {
    return getRouteInfoByPath(pathname);
  }, [pathname])

  useEffect(() => {
    fetchUserInfo();
    fetchAvatar();
  }, [fetchUserInfo, fetchAvatar]);

  if (loading) {
    return (
      <div style={{ padding: 32 }}>
        <Skeleton
          active
          avatar
          loading
          paragraph={{
            rows: 6,
          }}
          round
          title
        />
      </div>
    );
  }

  if (!loaded) {
    return null;
  }
  
  if (routeInfo?.permission) {
    if (!hasPermission(routeInfo.permission)) {
      return <Navigate to={getRouteInfo('403')!.path} replace />;
    }
  }

  return <Outlet />;
};

export default memo(RouteGuarder);
