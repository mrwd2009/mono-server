import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useHistory }  from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import takeRight from 'lodash/takeRight';
import endsWith from 'lodash/endsWith';
import { useMounted } from '../hooks/useMounted';
import api from '../config/api';
import { getRouter } from '../config/router';

let AuthContext;
const { Provider } = AuthContext =  createContext();

export function clearToken() {
  localStorage.removeItem('user');
  localStorage.removeItem('permissions');
  localStorage.removeItem('defaultURL');
  localStorage.removeItem('token');
  localStorage.removeItem('sso');
}

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    user: localStorage.getItem('user') || '',
    permissions: localStorage.getItem('permissions') || '[]',
    token: localStorage.getItem('token') || '',
    defaultURL: localStorage.getItem('defaultURL') || '',
    sso: localStorage.getItem('sso') || '',
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isMounted = useMounted();

  const {
    user,
    token,
  } = authState;

  const isInternalUser = useCallback(() => {
    const user = localStorage.getItem('user');
    return user && (endsWith(user, 'gridx.com') || endsWith(user, 'gridx.cn'));
  }, []);

  // record visisted page
  const visitedPagesRef = useRef([{
    pathname: history.location.pathname,
    search: history.location.search,
  }]);
  useEffect(() => {
    return history.listen((location) => {
      const {
        pathname,
        search,
      } = location;
      visitedPagesRef.current.push({
        pathname,
        search,
      });
      visitedPagesRef.current = takeRight(visitedPagesRef.current, 5);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserInfo = useCallback((data) => {
    const newAuthState = { ...authState, ...data };
    const {
      user,
      token,
      permissions,
      defaultURL,
      sso,
    } = newAuthState;
    localStorage.setItem('user', user);
    localStorage.setItem('permissions', JSON.stringify(permissions));
    localStorage.setItem('token', token);
    localStorage.setItem('defaultURL', defaultURL);
    localStorage.setItem('sso', sso);
    setAuthState(newAuthState);
  }, [authState, setAuthState]);

  const clearUserInfo = useCallback(() => {
    localStorage.setItem('user', '');
    localStorage.setItem('permissions', '[]');
    localStorage.setItem('token', '');
    localStorage.setItem('defaultURL', '');
    localStorage.setItem('sso', '');
    setAuthState({
      user: '',
      permissions: [],
      token: '',
      defaultURL: '',
      sso: '',
    });
  }, [setAuthState]);

  const validateToken = useCallback(() => {
    if(token) {
      const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
      const tokenExp = dayjs.unix(decodedToken.exp);
      if(tokenExp.isAfter(dayjs())) {
        return true;
      } else {
        clearUserInfo();
        return false;
      }
    }
    return false;
  }, [clearUserInfo, token]);

  const logout = useCallback(() => {
    setLoading(true);
    axios.get(`${api.auth.logout}?user=${user}`)
    .then(() => {
      if (isMounted.current) {
        visitedPagesRef.current = [];
        setLoading(false);
        clearUserInfo();
        history.push(getRouter('login').pathname);
      }
    })
    .catch(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    });
  }, [clearUserInfo, isMounted, history, user]);

  return (
    <Provider
      value={{
        ...authState,
        loading,
        setUserInfo,
        clearUserInfo,
        validateToken,
        logout,
        isInternalUser,
        visitedPagesRef,
      }}
    >
      <Spin spinning={loading}>
        { children }
      </Spin>
    </Provider>
  );
}

export { AuthProvider, AuthContext }

export function useAuth() {
  return useContext(AuthContext);
}

export function hasPermission(code) {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  // use React.memo
  const permissions = localStorage.getItem('permissions');
  if(permissions && permissions.indexOf(code) > -1) {
    return true;
  }
  return false;
}