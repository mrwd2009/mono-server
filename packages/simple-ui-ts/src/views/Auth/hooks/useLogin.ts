import { useState, useCallback } from 'react';
import axios from 'axios';
// import findLastIndex from 'lodash/findLastIndex';
// import includes from 'lodash/includes';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import useMounted from '../../../hooks/useMounted';
import { getRouteInfo } from '../../../config/routes-info';
import { updateUserInfo } from '../slice';
import { useAppDispatch } from '../../../hooks';

// TODO add login redirection

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  // const { setUserInfo, visitedPagesRef } = useAuth();
  const isMounted = useMounted();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    params => {
      setLoading(true);
      axios
        .post(apiEndpoints.auth.login, params, { showError: true })
        .then((result: any) => {
          if (isMounted.current) {
            const { permissions, token, user, resetPassword } = result;
            setLoading(true);
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
            // setUserInfo({
            //   defaultURL,
            //   permissions,
            //   token,
            //   user,
            //   sso: '',
            // });
            // const loginPath = getRouter('login').pathname;
            // const loginUrlIndex = findLastIndex(visitedPagesRef.current, item => item.pathname === loginPath);
            // if (loginUrlIndex !== -1 && loginUrlIndex === visitedPagesRef.current.length - 1) {
            //   // remove current route '/login', otherwise keep latest visited url
            //   visitedPagesRef.current.pop();
            // }
            // const prevPage = visitedPagesRef.current.pop();
            // if (prevPage && !includes(ignoredPaths, prevPage.pathname)) {
            //   history.push(prevPage);
            // } else {
            navigate('/');
            // }
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setLoading(false);
          }
        });
    },
    [navigate, isMounted, dispatch],
  );
  return {
    loading,
    handleLogin,
  };
};

export default useLogin;
