import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import useMounted from '../../../hooks/useMounted';
import { getRouteInfo } from '../../../config/routes-info';
import { clearUserInfo } from '../slice';
import { useAppDispatch } from '../../../hooks';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const isMounted = useMounted();
  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    setLoading(true);
    axios.get(apiEndpoints.auth.logout)
      .then(() => {
        if(isMounted.current) {
          setLoading(false);
          dipatch(clearUserInfo());
          navigate(getRouteInfo('login')!.path);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setLoading(false);
        }
      });
    
  }, [navigate, isMounted, dipatch]);

  return {
    loading,
    handleLogout,
  };
};

export default useLogout;