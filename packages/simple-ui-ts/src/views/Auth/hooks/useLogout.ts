import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';
import { clearUserInfo } from '../slices';
import { useAppDispatch } from '../../../hooks';

const useLogout = () => {
  const navigate = useNavigate();
  const dipatch = useAppDispatch();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.logout });

  const handleLogout = useCallback(() => {
    request().then(() => {
      dipatch(clearUserInfo());
      navigate(getRouteInfo('login')!.path);
    });
  }, [navigate, dipatch, request]);

  return {
    loading,
    handleLogout,
  };
};

export default useLogout;
