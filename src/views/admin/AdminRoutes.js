import React from 'react';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import { authRoles } from 'auth/authRoles';
import Customers from './customers';

const Dashbaoard = Loadable(lazy(() => import('./dashboard')));
const Products = Loadable(lazy(() => import('./products')));
const AddProduct = Loadable(lazy(() => import('./products/addProduct')));

const adminRoutes = [
  {
    path: '/dashboard/default',
    element: <Dashbaoard />,
    auth: authRoles.admin,
  },
  {
    path: '/dashboard/products',
    element: <Products />,
    auth: authRoles.admin,
  },
  {
    path: '/dashboard/products/add-product',
    element: <AddProduct />,
    auth: authRoles.admin,
  },
  {
    path: '/dashboard/customers',
    element: <Customers />,
    auth: authRoles.admin,
  },
];

export default adminRoutes;
