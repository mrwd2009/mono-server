import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom'
import banner from '../../assets/images/banner.png';

const currentYear = (new Date()).getFullYear();

const MainLayout: FC = () => {
  return (
    <div className="app-ex-layout-main">
      <div className="app-ex-layout-main--wrapper">
        <div className="app-ex-layout-main--header">
          <div className="app-ex-layout-main--header-content">
            <div className="app-ex-layout-main--header-banner">
              <img alt="Energix Banner" src={banner} />
            </div>
            <div className="app-ex-layout-main--header-menu">
              menu
            </div>
            <div className="app-ex-layout-main--header-extra">
              extra
            </div>
          </div>
        </div>
        <div className="app-ex-layout-main--body">
          <Outlet />
        </div>
        <div className="app-ex-layout-main--footer">
          <span>© {currentYear} Energix, inc. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MainLayout);