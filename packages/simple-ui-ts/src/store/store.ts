import { configureStore, Middleware } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query/react';
import reducer from './reducer';
import service from './service';

const store = configureStore({
  reducer: {
    ...service.reducer,
    ...reducer,
  },
  middleware: (getDefaultMiddleware): Middleware[] => {
    return getDefaultMiddleware().concat(service.middleware);
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store;
