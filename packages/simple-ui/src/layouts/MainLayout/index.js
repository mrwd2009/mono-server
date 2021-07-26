import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import { Layout } from 'antd';
import MainHeader from './MainHeader';
import MainNav from './MainNav';
import MainBC from './MainBC';
import MainFooter from './MainFooter';
import { GlobalInfoProvider, BcProvider, GlobalSearchProvider } from '../../context/app';
import useGlobalInfoHook from '../../hooks/useGlobalInfo';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const { globalInfo, setGlobalInfo, fetchGlobalInfo, clearGlobalInfo } = useGlobalInfoHook();
  const globalValue = useMemo(() => ({
    globalInfo,
    setGlobalInfo,
    fetchGlobalInfo,
  }), [globalInfo, setGlobalInfo, fetchGlobalInfo]);

  useEffect(() => {
    // clear after unmounting
    return () => clearGlobalInfo();
  }, [clearGlobalInfo]);

  // auto refresh global information
  const fetchRef = useRef(fetchGlobalInfo);
  fetchRef.current = fetchGlobalInfo;
  // useEffect(() => {
  //   const callback = () => {
  //     if (process.env.NODE_ENV === 'development') {
  //       return;
  //     }
  //     fetchRef.current && fetchRef.current();
  //   };
  //   callback();
  //   const timer = setInterval(callback, 20000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [fetchRef]);
  
  // for breakcrumb
  const [bc, setBC] = useState([]);
  const bcValue = useMemo(() => ({
    bc,
    setBC,
  }), [bc, setBC]);

  // for global search
  const [globalSearch, setGlobalSearch] = useState({});
  const searchValue = useMemo(() => ({
    globalSearch,
    setGlobalSearch,
  }), [globalSearch, setGlobalSearch]);
  return (
    <GlobalInfoProvider value={globalValue}>
      <BcProvider value={bcValue}>
        <GlobalSearchProvider value={searchValue}>
          <Layout className="ant-layout--main">
            <Header className="ant-layout-header--main">
              <MainHeader />
              <MainNav />
            </Header>
            <Content className="ant-layout-content--main">
              <MainBC />
              {children}
            </Content>
            <Footer className="ant-layout-footer--main">
              <MainFooter />
            </Footer>
          </Layout>
        </GlobalSearchProvider>
      </BcProvider>
    </GlobalInfoProvider>
  );
};

export default memo(MainLayout);