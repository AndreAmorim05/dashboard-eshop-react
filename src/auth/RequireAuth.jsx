import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { flat } from 'utils/utils';
import AllPages from 'routes';

const userHasPermission = (pathname, role, routes) => {
  if (!role) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);
  const authenticated =
    matched && matched.auth && matched.auth.length
      ? matched.auth.includes(role)
      : true;
  return authenticated;
};

const RequireAuth = ({ children }) => {
  // const location = useLocation();
  // const { roles } = useAuth();

  // const content = roles.some((role) => allowedRoles.includes(role)) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/session/signin" state={{ from: location }} replace />
  // );

  // return content;
  let { isAuthenticated, role } = useAuth();
  const { pathname } = useLocation();

  const routes = flat(AllPages);

  const hasPermission = userHasPermission(pathname, role, routes);

  let authenticated = isAuthenticated && hasPermission;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};
export default RequireAuth;
