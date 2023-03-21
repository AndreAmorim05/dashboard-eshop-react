import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      // localStorage.setItem('accessToken', accessToken);
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

export const selectCurrentUser = (state) => state.auth.user;
