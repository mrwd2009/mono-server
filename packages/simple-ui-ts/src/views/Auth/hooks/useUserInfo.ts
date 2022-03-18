import { useState, useCallback } from 'react';
import axios from 'axios';
import apiEndpoints from '../../../config/api-endpoints';
import useMounted from '../../../hooks/useMounted';
import { updateUserInfo } from '../slice';
import { useAppDispatch } from '../../../hooks';

const useUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const isMounted = useMounted();
  const dipatch = useAppDispatch();

  const fetchUserInfo = useCallback(() => {
    setLoading(true);
    axios.get(apiEndpoints.system.info).then((result: any) => {
      if (isMounted.current) {
        dipatch(
          updateUserInfo({
            user: result.user,
            permissions: result.permissions,
          }),
        );
        setLoading(false);
      }
    });
  }, [isMounted, dipatch]);

  return {
    loading,
    fetchUserInfo,
  };
};

export default useUserInfo;
