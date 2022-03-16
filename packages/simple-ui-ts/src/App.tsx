import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Initializer from './config/initializers';

function App() {
  return (
    <BrowserRouter>
      <Initializer />
      <Router />
    </BrowserRouter>
  );
}

export default memo(App);
