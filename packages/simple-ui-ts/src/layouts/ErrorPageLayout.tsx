import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom'
import banner from '../assets/images/banner.png';

const currentYear = (new Date()).getFullYear();

const ErrorPageLayout: FC = () => {
  return (
    <div className="app-ex-layout-error-page">
      <div className="app-ex-layout-error-page--wrapper">
        <div className="app-ex-layout-error-page--header">
          <div className="app-ex-layout-error-page--header-content">
            <div className="app-ex-layout-error-page--header-banner">
              <img alt="Energix Banner" src={banner} />
            </div>
          </div>
        </div>
        <div className="app-ex-layout-error-page--body">
          <Outlet />
        </div>
        <div className="app-ex-layout-error-page--footer">
          <span>© {currentYear} Energix, inc. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ErrorPageLayout);