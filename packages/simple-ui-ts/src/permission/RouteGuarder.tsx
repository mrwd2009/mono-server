import { FC, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Skeleton } from 'antd';
import useUserInfo from '../views/Auth/hooks/useUserInfo';

const RouteGuarder: FC = () => {
  const { loading, loaded, fetchUserInfo } = useUserInfo();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

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

  return <Outlet />;
};

export default memo(RouteGuarder);
