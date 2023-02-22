import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { authRoles } from 'auth/authRoles';

const Dashbaoard = Loadable(lazy(() => import('./dashboard')));
const Products = Loadable(lazy(() => import('./products')));


const adminRoutes = [
  { path: '/dashboard/default', element: <Dashbaoard />, auth: authRoles.admin },
  { path: '/dashboard/products', element: <Products />, auth: authRoles.admin },
];

export default adminRoutes;
