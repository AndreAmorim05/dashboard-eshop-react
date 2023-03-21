import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';
import globalReducer from 'state';
// import authReducer from './authSlice';
import { apiSlice } from './apiSlice';
import authReducer from 'auth/authSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefault) => getDefault().concat(api.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, api.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
