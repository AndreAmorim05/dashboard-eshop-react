import React from 'react';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import JWTLogout from './JWTLogout';
import JwtLogin from './JWTLogin';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));

const sessionRoutes = [
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/logout', element: <JWTLogout /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
];

export default sessionRoutes;
