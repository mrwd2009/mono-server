import { Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import contractApi from '../views/Contract/services/service';
import permissionApi from '../views/System/Permission/services/service';
import roleApi from '../views/System/Role/services/service';

const reducer: ReducersMapObject = {
  [contractApi.reducerPath]: contractApi.reducer,
  [permissionApi.reducerPath]: permissionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
};

const middleware: Middleware[] = [contractApi.middleware, permissionApi.middleware, roleApi.middleware];

const service = {
  reducer,
  middleware,
};

export default service;
