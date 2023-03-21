import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';
import globalReducer from 'state';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
