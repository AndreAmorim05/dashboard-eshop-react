import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = 'api/v1';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `${apiUrl}/users/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => `${apiUrl}/products`,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery } = api;
