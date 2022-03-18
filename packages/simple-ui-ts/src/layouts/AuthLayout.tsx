import { FC, memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import bg500 from '../assets/images/auth-bg/bg-500.jpeg';
import bg750 from '../assets/images/auth-bg/bg-750.jpeg';
import bg1000 from '../assets/images/auth-bg/bg-1000.jpeg';
import bg1500 from '../assets/images/auth-bg/bg-1500.jpeg';
import bg2500 from '../assets/images/auth-bg/bg-2500.jpeg';
import brand from '../assets/images/brand.png';

const currentYear = new Date().getFullYear();

export interface HeaderExtra {
  title: string;
  path: string;
  help: string;
}

const AuthLayout: FC<{ header?: HeaderExtra; children: ReactElement }> = ({ header, children }) => {
  return (
    <div className="app-ex-layout-auth">
      <div className="app-ex-layout-auth--bg">
        <img
          className="app-ex-layout-auth--bg-image"
          alt="Background"
          src={bg1000}
          srcSet={`${bg500} 500w,${bg750} 750w, ${bg1000} 1000w,${bg1500} 1500w,${bg2500} 2500w,`}
        />
        <div className="app-ex-layout-auth--bg-overlay" />
      </div>
      <div className="app-ex-layout-auth--wrapper">
        <div className="app-ex-layout-auth--header">
          <div className="app-ex-layout-auth--header-content">
            <div className="app-ex-layout-auth--header-brand">
              <img
                alt="Energix Brand"
                src={brand}
              />
            </div>
            {header && (
              <div className="app-ex-layout-auth--header-extra">
                <span>{header.help}</span>
                <Link
                  to={header.path}
                  className="route-link"
                >
                  {header.title}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="app-ex-layout-auth--body">{children}</div>
        <div className="app-ex-layout-auth--footer">
          <span>© {currentYear} Energix, inc. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthLayout);
