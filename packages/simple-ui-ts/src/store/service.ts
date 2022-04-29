import { Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import contractApi from '../views/Contract/services/service';
import permissionApi from '../views/System/Permission/services/service';

const reducer: ReducersMapObject = {
  [contractApi.reducerPath]: contractApi.reducer,
  [permissionApi.reducerPath]: permissionApi.reducer,
};

const middleware: Middleware[] = [contractApi.middleware, permissionApi.middleware];

const service = {
  reducer,
  middleware,
};

export default service;
