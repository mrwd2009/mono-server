import { Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import contractApi from '../views/Contract/services/service';


const reducer: ReducersMapObject = {
  [contractApi.reducerPath]: contractApi.reducer,
};

const middleware: Middleware[] = [
  contractApi.middleware,
];

const service = {
  reducer,
  middleware,
};

export default service;