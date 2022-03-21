import { FC, memo, useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import debounce from 'lodash/debounce';
import ResizeObserver from 'rc-resize-observer';
import brand from '../../assets/images/brand.png';
import SystemMenu from './SystemMenu';
import ThemeSwitch from './ThemeSwitch';
import UserAction from './UserAction';
import BC from './BC';
import { ContentSizeContext } from './contexts';

const currentYear = new Date().getFullYear();

const MainLayout: FC = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const debounceRef = useRef<any>();

  useEffect(() => {
    const _setResize = debounce(
      (_size) => {
        setSize(_size);
      },
      200,
      { leading: true, trailing: true },
    );
    debounceRef.current = _setResize;
    return () => {
      _setResize.cancel();
    };
  }, []);

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
          <ResizeObserver
            onResize={(rawSize) => {
              if (rawSize.width !== size.width || rawSize.height !== size.height) {
                debounceRef.current({
                  width: rawSize.width,
                  height: rawSize.height,
                });
              }
            }}
          >
            <div className="app-ex-layout-main--content">
              <ContentSizeContext.Provider value={size}>
                <Outlet />
              </ContentSizeContext.Provider>
            </div>
          </ResizeObserver>
        </div>
        <div className="app-ex-layout-main--footer">
          <span>© {currentYear} Energix, inc. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MainLayout);
