import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import find from 'lodash/find';
import { hasPermission, useAuth } from '../context/auth';
import routerList from '../config/router';
import Forbidden from '../views/Common/403';

const PrivateRoute = ({ children }) => {
  const history = useHistory();
  const { logout } = useAuth();
  const router = find(routerList, { pathname: history.location.pathname });
  let allowed = true;
  if (router && router.rbacCode) {
    allowed = hasPermission(router.rbacCode);
  }
  if (!allowed) {
    return <Forbidden logout={logout} />
  }
  return children;
}

export default memo(PrivateRoute);