import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import { navigations } from 'navigations';

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  isLoading,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const profileImage = 'https://picsum.photos/200/200';

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
            '*::-webkit-scrollbar': {
              width: '0.4em',
            },
            '*::-webkit-scrollbar-track': {
              '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              outline: `1px solid ${theme.palette.secondary[200]}`,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    E-SHOP
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navigations.map(({ text, path, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(path);
                        setActive(path);
                      }}
                      sx={{
                        backgroundColor:
                          active === path
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === path
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === path && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box height="5rem"></Box>
          </Box>

          <Box
            position="fixed"
            bottom="0rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1.5rem"
              m="1.5rem 2rem 1.5rem 1.9rem"
            >
              {!isLoading ? (
                <>
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user.data.name}
                    </Typography>
                    <Typography
                      fontSize="0.75rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {user.data.occupation}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Skeleton variant="circular" height="32px" width="32px" />
                  <Box textAlign="left">
                    <Skeleton variant="text" sx={{ fontSize: '0.85rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} />
                  </Box>
                </>
              )}
              <IconButton>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: '25px ',
                  }}
                />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
