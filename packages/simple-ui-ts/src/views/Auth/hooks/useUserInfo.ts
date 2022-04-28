import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { updateUserInfo } from '../slices';
import { useAppDispatch } from '../../../hooks';

const useUserInfo = () => {
  const dipatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const [{ loading }, request] = useAxios({ url: apiEndpoints.system.info });

  const fetchUserInfo = useCallback(() => {
    request().then(({ data: result }) => {
      dipatch(
        updateUserInfo({
          user: result.user,
          username: result.username,
          permissions: result.permissions,
        }),
      );
      setLoaded(true);
    });
  }, [request, dipatch]);

  return {
    loaded,
    loading,
    fetchUserInfo,
  };
};

export default useUserInfo;
