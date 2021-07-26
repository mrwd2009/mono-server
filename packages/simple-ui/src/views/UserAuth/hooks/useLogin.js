import { useState, useCallback } from 'react';
import axios from 'axios';
import findLastIndex from 'lodash/findLastIndex';
import includes from 'lodash/includes';
import { useHistory } from 'react-router-dom';
import api from '../../../config/api';
import useMounted from '../../../hooks/useMounted';
import { getRouter } from '../../../config/router';
import { useAuth } from '../../../context/auth';

const ignoredPaths = [
  getRouter('login').pathname,
  getRouter('register').pathname,
  getRouter('forgotPass').pathname,
  getRouter('resetPass').pathname,
];

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUserInfo, visitedPagesRef } = useAuth();
  const isMounted = useMounted();
  const history = useHistory();

  const handleLogin = useCallback((params) => {
    setLoading(true);
    axios.post(api.auth.login, params, { showError: true })
      .then((result) => {
        if(isMounted.current) {
          const { 
            defaultURL,
            permissions,
            token,
            user,
            resetPassword,
          } = result;
          setLoading(true);
          if (resetPassword) {
            history.push(`${getRouter('resetPass').pathname}?token=${token}`);
            return;
          }
          setUserInfo({
            defaultURL,
            permissions,
            token,
            user,
            sso: '',
          });
          const loginPath = getRouter('login').pathname;
          const loginUrlIndex = findLastIndex(visitedPagesRef.current, item => item.pathname === loginPath);
          if (loginUrlIndex !== -1 && loginUrlIndex === visitedPagesRef.current.length - 1) {
            // remove current route '/login', otherwise keep latest visited url
            visitedPagesRef.current.pop();
          }
          const prevPage = visitedPagesRef.current.pop();
          if (prevPage && !includes(ignoredPaths, prevPage.pathname)) {
            history.push(prevPage);
          } else {
            history.push('/');
          }
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setLoading(false);
        }
      });
    
  }, [history, isMounted, setUserInfo, visitedPagesRef]);
  return {
    loading,
    handleLogin,
  };
};

export default useLogin;