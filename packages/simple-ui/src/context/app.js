import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Spin } from 'antd';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';
import useTheme from '../hooks/useTheme';
import { homePath } from '../config/router';

let AppContext, BcContext, GlobalInfoContext, GlobalSearchContext;
const { Provider } = AppContext =  createContext();
const { Provider: BcProvider } = BcContext = createContext();
const { Provider: GlobalInfoProvider } = GlobalInfoContext = createContext();
const { Provider: GlobalSearchProvider } = GlobalSearchContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    appLoading: false,
    statusCode: 200,
  });
  const {loaded: themeLoaded, theme, setTheme, fetchTheme} = useTheme();
  const appValue = useMemo(() => ({
    appState,
    setAppState,
    theme,
    themeLoaded,
    setTheme,
    fetchTheme,
  }), [appState, setAppState, theme, themeLoaded, setTheme, fetchTheme]);

  return (
    <Provider value={appValue}>
      <Spin spinning={appState.appLoading}>
        { children }
      </Spin>
    </Provider>
  );
}

export { AppProvider, AppContext, BcProvider, BcContext, GlobalInfoProvider, GlobalInfoContext, GlobalSearchProvider, GlobalSearchContext };

export function useApp() {
  return useContext(AppContext);
}

export const useGlobalInfo = () => {
  const { globalInfo, setGlobalInfo, fetchGlobalInfo } = useContext(GlobalInfoContext);
  return { globalInfo, setGlobalInfo, fetchGlobalInfo };
};

export const useBC = (initBC, includeHome = true) => {
  const { bc, setBC } = useContext(BcContext);
  useEffect(() => {
    if (initBC) {
      let items = initBC;
      if (includeHome) {
        items = concat([{ title: 'Home', pathname: homePath }], items)
      }
      setBC(items);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { bc, setBC };
};

export const useGlobalSearch = () => {
  const { globalSearch, setGlobalSearch } = useContext(GlobalSearchContext);
  // handler to process searching
  const getSearchHandler = useCallback(({ key, onSearch }) => {
    return () => {
      if (globalSearch.key === key && globalSearch.value.length) {
        let search = {};
        // fetch each filtering field value
        forEach(globalSearch.value, (item) => {
          search[item.field] = search[item.field] || [];
          search[item.field].push(item.value);
        });
        setGlobalSearch({
          key,
          value: [],
        });
        onSearch(search);
      }
    }
  }, [globalSearch, setGlobalSearch]);
  // to check searching status
  const isSearching = useCallback((key) => {
    return globalSearch.key === key && !!globalSearch.value.length;
  }, [globalSearch]);
  return { globalSearch, setGlobalSearch, getSearchHandler, isSearching };
};