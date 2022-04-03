import { memo, FC, useEffect, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'
import { ConfigProvider } from 'antd';
import Empty from './components/Empty';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';
import Initializer from './config/initializers';
import { useTheme, useLang } from './hooks';

const renderEmpty = (componentName?: string): React.ReactNode => () => {
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

  useEffect(() => {
    fetchTheme(theme);
    fetchLang(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!loaded || !langLoaded) {
    return null;
  }

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
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
