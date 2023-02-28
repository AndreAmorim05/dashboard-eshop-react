import React from 'react';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
// @mui
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
// utils
import { fToNow } from 'utils/formatDate';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

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
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);
  const theme = useTheme();
  const isUnread = notification.isUnRead;

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        bgcolor: isUnread ? theme.palette.secondary[300] : 'transparent',
        color: isUnread
          ? theme.palette.primary[200]
          : theme.palette.secondary[400],
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
            ? theme.palette.primary[600]
            : theme.palette.secondary[400],
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

// ----------------------------------------------------------------------

function renderContent(notification) {
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
              color: 'primary.light',
            }),
          }}
        >
          &nbsp; {noCase(notification.description)}
        </Typography>
      </Typography>
    ),
  };
}
