import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const JWTLogout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/" />;
};

export default JWTLogout;
