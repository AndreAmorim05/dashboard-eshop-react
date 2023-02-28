import React, { useState } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import { setMode } from 'state';
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Skeleton,
} from '@mui/material';
import NotificationsPopover from './NotificationsPopover';

const Navbar = ({
  drawerWidth,
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (action) => {
    setAnchorEl(null);
    if (action == 'logout') {
      navigate('session/logout');
    }
  };

  const profileImage = 'https://picsum.photos/200/200';

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
        [theme.breakpoints.up('sm')]: {
          position: 'static',
          width: isOpen ? `calc(100% - ${drawerWidth + 1}px)` : '100%',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {/* <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="0.3rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>

          <NotificationsPopover />

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '0.8rem',
              }}
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
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem
                onClick={() => {
                  handleClose('settings');
                }}
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose('logout');
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
