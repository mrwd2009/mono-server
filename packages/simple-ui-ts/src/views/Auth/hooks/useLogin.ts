import { useCallback } from 'react';
import useAxios from 'axios-hooks';
// import findLastIndex from 'lodash/findLastIndex';
// import includes from 'lodash/includes';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';
import { updateUserInfo } from '../slices';
import { useAppDispatch } from '../../../hooks';
import { common } from '../../../util';

// TODO add login redirection

const useLogin = () => {
  // const { setUserInfo, visitedPagesRef } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.login, showError: true, method: 'post' });
  const handleLogin = useCallback(
    (params) => {
      request({
        data: {
          ...params,
          client: {
            deviceType: common.getDeviceType(),
            os: common.getOSName(),
            browser: common.getBrowser(),
            timeZone: common.getTimezone(),
          }
        },
      }).then(({ data: result }) => {
        const { permissions, token, email, reset } = result;
        if (reset) {
          navigate(`${getRouteInfo('reset-password')?.path}?token=${token}`);
          return;
        }
        dispatch(
          updateUserInfo({
            permissions,
            user: email,
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
