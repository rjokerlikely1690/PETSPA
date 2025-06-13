import React from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
} from '@mui/material';
import { Notification } from '../hooks/useNotification';

interface NotificationToastProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notifications,
  onRemove,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 88, // Below the AppBar
        right: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400,
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={() => onRemove(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ position: 'relative', zIndex: 9999 }}
        >
          <Alert
            onClose={() => onRemove(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{
              minWidth: 350,
              maxWidth: 400,
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
              boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.3)',
              '& .MuiAlert-icon': {
                fontSize: '20px',
              },
              '& .MuiAlert-action': {
                padding: 0,
              },
            }}
          >
            <AlertTitle sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 600,
              fontSize: '0.95rem',
              mb: notification.message ? 0.5 : 0,
            }}>
              {notification.title}
            </AlertTitle>
            {notification.message && (
              <Box sx={{ 
                fontSize: '0.85rem',
                lineHeight: 1.4,
                opacity: 0.95
              }}>
                {notification.message}
              </Box>
            )}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationToast; 