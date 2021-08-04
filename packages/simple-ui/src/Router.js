import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainLayout, SimpleLayout } from './layouts';
import { getRouter } from './config/router';
import PrivateRoute from './routes/PrivateRoute';
import { Login, Register, ForgotPassword, ResetPassword } from './views/UserAuth';
import NotFound from './views/Common/404';
import Dashboard from './views/Dashboard';

const authRender = (Comp) => {
  return <SimpleLayout><Comp /></SimpleLayout>;
};

const mainRender = () => {
  const dashPathname = getRouter('dashboard').pathname;
  return (
    <PrivateRoute>
      <MainLayout>
        <Switch>
          <Redirect from="/" exact to={dashPathname} />
          <Route path={dashPathname} exact component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </PrivateRoute>
  );
};

const Router = () => {
  return (
    <Switch>
      <Route path={getRouter('login').pathname} render={() => authRender(Login)} />
      <Route path={getRouter('register').pathname} render={() => authRender(Register)} />
      <Route path={getRouter('forgotPass').pathname} render={() => authRender(ForgotPassword)} />
      <Route path={getRouter('resetPass').pathname} render={() => authRender(ResetPassword)} />
      <Route render={mainRender} />
    </Switch>
  );
};

export default memo(Router);