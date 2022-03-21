import { useCallback } from 'react';
import useAxios from 'axios-hooks';
// import findLastIndex from 'lodash/findLastIndex';
// import includes from 'lodash/includes';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';
import { updateUserInfo } from '../slices';
import { useAppDispatch } from '../../../hooks';

// TODO add login redirection

const useLogin = () => {
  // const { setUserInfo, visitedPagesRef } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.login, showError: true, method: 'post' });

  const handleLogin = useCallback(
    (params) => {
      request({
        data: params,
      }).then(({ data: result }) => {
        const { permissions, token, user, resetPassword } = result;
        if (resetPassword) {
          navigate(`${getRouteInfo('reset-password')?.path}?token=${token}`);
          return;
        }
        dispatch(
          updateUserInfo({
            permissions,
            user,
          }),
        );
        navigate('/');
      });
    },
    [navigate, dispatch, request],
  );
  return {
    loading,
    handleLogin,
  };
};

export default useLogin;
