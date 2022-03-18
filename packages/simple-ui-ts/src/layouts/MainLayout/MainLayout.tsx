import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import brand from '../../assets/images/brand.png';
import SystemMenu from './SystemMenu';
import ThemeSwitch from './ThemeSwitch';
import UserAction from './UserAction';
import BC from './BC';

const currentYear = new Date().getFullYear();

const MainLayout: FC = () => {
  return (
    <div className="app-ex-layout-main">
      <div className="app-ex-layout-main--wrapper">
        <div className="app-ex-layout-main--header">
          <div className="app-ex-layout-main--header-content">
            <div className="app-ex-layout-main--header-brand">
              <img
                alt="Energix Brand"
                src={brand}
              />
            </div>
            <div className="app-ex-layout-main--header-menu">
              <SystemMenu />
            </div>
            <div className="app-ex-layout-main--header-extra">
              <ThemeSwitch />
              <UserAction />
            </div>
          </div>
        </div>
        <div className="app-ex-layout-main--body">
          <BC />
          <div className="app-ex-layout-main--content">
            <Outlet />
          </div>
        </div>
        <div className="app-ex-layout-main--footer">
          <span>© {currentYear} Energix, inc. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MainLayout);
