import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'views/admin/layout/Navbar';
import Sidebar from 'views/admin/layout/Sidebar';
import { useGetUserQuery } from 'state/api';
import api from 'api/routes';
import { useGetMe } from 'api/hooks/useUser';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isNonMobile ? true : false
  );
  const [drawerWidth, setDrawerWidth] = useState('250px');
  const userId = useSelector((state) => state.global.userId);
  // const { data } = useGetUserQuery(userId);
  const { data, isLoading } = useGetMe();

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        user={data}
        isLoading={isLoading}
        isNonMobile={isNonMobile}
        drawerWidth={drawerWidth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data}
          isLoading={isLoading}
          isNonMobile={isNonMobile}
          drawerWidth={drawerWidth}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
