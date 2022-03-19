import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { updateUserInfo } from '../slices';
import { useAppDispatch } from '../../../hooks';

const useUserInfo = () => {
  const dipatch = useAppDispatch();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.system.info });

  const fetchUserInfo = useCallback(() => {
    request().then(({ data: result }) => {
      dipatch(
        updateUserInfo({
          user: result.user,
          permissions: result.permissions,
        }),
      );
    });
  }, [request, dipatch]);

  return {
    loading,
    fetchUserInfo,
  };
};

export default useUserInfo;
