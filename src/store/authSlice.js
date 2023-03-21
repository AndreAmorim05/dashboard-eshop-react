import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.isInitialised = true;
      state.user = user;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { init, login, register, logout } = authSlice.actions;

export default authSlice.reducer;
