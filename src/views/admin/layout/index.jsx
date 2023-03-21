import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from 'views/admin/layout/Navbar';
import Sidebar from 'views/admin/layout/Sidebar';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isNonMobile ? true : false
  );
  const [drawerWidth, setDrawerWidth] = useState('250px');
  const isLoading = false;
  const [user, setUser] = useState({ name: localStorage.getItem('username') });

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        user={user}
        isLoading={isLoading}
        isNonMobile={isNonMobile}
        drawerWidth={drawerWidth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user}
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
