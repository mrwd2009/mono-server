import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';
import Initializer from './config/initializers';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Initializer />
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default memo(App);
