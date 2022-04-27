import { memo, FC, useEffect, ReactElement, useContext } from 'react';
import { BrowserRouter, UNSAFE_NavigationContext } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ConfigProvider } from 'antd';
import Empty from './components/Empty';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';
import Initializer from './config/initializers';
import { useTheme, useLang } from './hooks';
import { pushVisitedPage } from './store/slices';
import { useAppDispatch } from './hooks';

const renderEmpty =
  (componentName?: string): React.ReactNode =>
  () => {
    switch (componentName) {
      case 'Table':
      case 'List':
        return <Empty size="small" />;

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return <Empty size="small" />;
      default:
        return <Empty />;
    }
  };

const AppContent: FC<{ children: ReactElement[] }> = ({ children }) => {
  const { loaded, theme, fetchTheme } = useTheme();
  const { loaded: langLoaded, lang, fetchLang, i18n } = useLang();
  const dispatch = useAppDispatch();
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    fetchTheme(theme);
    fetchLang(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // record visited route
  useEffect(() => {
    const unlisten = (navigator as any).listen(({ location }: any) => {
      dispatch(
        pushVisitedPage({
          pathname: location.pathname,
          search: location.search,
        }),
      );
    });
    return unlisten;
  }, [dispatch, navigator]);

  if (!loaded || !langLoaded) {
    return null;
  }

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContent>
          <Initializer />
          <Router />
        </AppContent>
      </Provider>
    </BrowserRouter>
  );
}

export default memo(App);
