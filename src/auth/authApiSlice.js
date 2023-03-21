import { apiSlice } from 'redux/apiSlice';
import { logOut, setUser, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, user } = data;
          dispatch(setCredentials({ accessToken }));
          dispatch(setUser({ user }));
          localStorage.setItem('username', user.name);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    me: builder.mutation({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ data }));
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useMeMutation,
} = authApiSlice;
