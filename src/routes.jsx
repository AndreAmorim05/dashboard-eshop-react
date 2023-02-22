import AuthGuard from 'auth/AuthGuard';
import adminRoutes from 'views/admin/AdminRoutes';
import NotFound from 'views/sessions/NotFound';
import sessionRoutes from 'views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import Layout from 'views/admin/layout';

const routes = [
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      ...adminRoutes,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
