import React, { memo, useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider, useApp } from './context/app';
import { AuthProvider, useAuth } from "./context/auth";
import { request } from './utils/axios';
import './utils/dayjs';
import Router from './Router';

const AppInner = () => {
  const { theme, themeLoaded, fetchTheme } = useApp();
  const history = useHistory();
  const auth = useAuth();
  useEffect(() => {
    request({
      auth,
      history,
    });
  }, [auth, history])
  useEffect(() => {
    fetchTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!themeLoaded) {
    return null;
  }
  return (
    <Router />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <ErrorBoundary>
            <AppInner />
          </ErrorBoundary>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default memo(App);
