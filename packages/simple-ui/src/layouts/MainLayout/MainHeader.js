import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import GlobalSearch from './GlobalSearch';
import AccountMenu from './AccountMenu';
import { getRouter } from '../../config/router';

const dashboardPathname = getRouter('dashboard').pathname;

const MainHeader = () => {
  return (
    <div className="gridx-header">
      <Link to={dashboardPathname}>
        <Logo title="GridX Logo" className="gridx-header-logo" />
      </Link>
      <GlobalSearch />
      <AccountMenu />
    </div>
  );
};

export default memo(MainHeader);