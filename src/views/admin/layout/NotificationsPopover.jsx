import React from 'react';
import { noCase } from 'change-case';
import { useState } from 'react';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Popover,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { fToNow } from 'utils/formatDate';
import NOTIFICATIONS from './mock';

function renderContent(notification, theme) {
  const iconPaths = {
    order_placed: '/assets/icons/ic_notification_package.svg',
    order_shipped: '/assets/icons/ic_notification_shipping.svg',
    mail: '/assets/icons/ic_notification_mail.svg',
    chat_message: '/assets/icons/ic_notification_chat.svg',
  };
  const iconPath = iconPaths[notification.type];

  return {
    avatar: iconPath ? <img alt={notification.title} src={iconPath} /> : null,
    title: (
      <Typography variant="subtitle2">
        {notification.title}
        <Typography
          component="span"
          variant="body2"
          sx={{
            color: 'text.secondary',
            ...(notification.isUnRead && {
              color: theme.palette.secondary[100],
            }),
          }}
        >
          &nbsp; {noCase(notification.description)}
        </Typography>
      </Typography>
    ),
  };
}

function NotificationItem({ notification }) {
  const theme = useTheme();
  const { avatar, title } = renderContent(notification, theme);
  const isUnread = notification.isUnRead;

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        bgcolor: isUnread ? 'primary.light' : 'transparent',
        '&:hover': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{
          color: isUnread
            ? theme.palette.secondary[300]
            : theme.palette.secondary[100],
          '& > * + *': {
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: isUnread
              ? theme.palette.primary[300]
              : theme.palette.secondary[200],
          },
        }}
        primary={title}
        secondary={
          <>
            <AccessTimeIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
            <Typography variant="caption" component="span">
              {fToNow(notification.createdAt)}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const theme = useTheme();
  const totalUnRead = notifications.reduce(
    (count, item) => count + item.isUnRead,
    0
  );

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);
  const handleMarkAllAsRead = () =>
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );

  const notificationsByType = notifications.reduce((acc, notification) => {
    const { type } = notification;
    if (type in acc) {
      acc[type].push(notification);
    } else {
      acc[type] = [notification];
    }
    return acc;
  }, {});

  const renderNotificationList = (notifications) => (
    <List disablePadding>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </List>
  );

  const renderSubheader = (text) => (
    <ListSubheader
      disableSticky
      sx={{ py: 1, px: 2.5, typography: 'overline' }}
    >
      {text}
    </ListSubheader>
  );

  const renderNotificationSection = (sectionTitle, notifications) => {
    if (!notifications || notifications.length === 0) {
      return null;
    }
    return (
      <>
        {renderSubheader(sectionTitle)}
        {renderNotificationList(notifications)}
      </>
    );
  };

  const renderAllNotifications = () => {
    const sections = Object.entries(notificationsByType).map(
      ([type, notifications]) => renderNotificationSection(type, notifications)
    );
    return (
      <>
        {renderSubheader('New')}
        {renderNotificationList(notifications.slice(0, 2))}
        {renderNotificationSection('Before that', notifications.slice(2, 5))}
        <Divider sx={{ borderStyle: 'dashed' }} />
        {/* IF YOU WANT TO RENDER ALL OF SECTIONS UNCOMMENT BELOW */}
        {/* {sections} */}
      </>
    );
  };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="warning">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
        sx={{
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
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {renderAllNotifications()}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary[500]
                  : theme.palette.secondary[200],
            }}
          >
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}
