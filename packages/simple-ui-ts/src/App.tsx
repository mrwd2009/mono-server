import { memo, FC, useEffect, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';
import Initializer from './config/initializers';
import { useTheme } from './hooks';

const AppContent: FC<{ children: ReactElement[] }> = ({ children }) => {
  const { loaded, darkMode, fetchTheme } = useTheme();

  useEffect(() => {
    fetchTheme(darkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) {
    return null;
  }
  return <>{children}</>;
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
