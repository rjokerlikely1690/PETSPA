import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  Badge,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Event as CalendarIcon,
  Pets as PetsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

// Import pages
import Dashboard from '../pages/Dashboard';
import PetCalendar from '../pages/PetCalendar';
import Pets from '../pages/Pets';
import Clients from '../pages/Clients';
import TestPage from '../pages/TestPage';

// Import notification system
import { useNotification, UseNotificationReturn } from '../hooks/useNotification';
import NotificationToast from './NotificationToast';

// Create notification context
const NotificationContext = createContext<UseNotificationReturn | null>(null);

// Hook to use notification context
export const useAppNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useAppNotification must be used within NotificationProvider');
  }
  return context;
};

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', color: '#1E3A8A' },
  { text: 'Calendario', icon: <CalendarIcon />, path: '/', color: '#3B82F6' },
  { text: 'Mascotas', icon: <PetsIcon />, path: '/pets', color: '#60A5FA' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/clients', color: '#1E40AF' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '/settings', color: '#6B7280' },
];

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notification = useNotification();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Pet Spa';
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header del drawer */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        color: 'white',
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700, 
            mb: 0.5,
            letterSpacing: '-0.025em'
          }}>
            🐾 Pet Spa
          </Typography>
          <Typography variant="body2" sx={{ 
            opacity: 0.9,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400
          }}>
            Sistema de Gestión Profesional
          </Typography>
        </Box>
      </Box>
      
      {/* Perfil del usuario */}
      <Box sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(30, 58, 138, 0.02)' }}>
        <Avatar 
          sx={{ 
            width: 56, 
            height: 56, 
            mx: 'auto', 
            mb: 1.5,
            background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          color: '#1F2937',
          mb: 0.5
        }}>
          Administrador
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#6B7280',
          fontFamily: 'Inter, sans-serif'
        }}>
          Acceso completo
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, borderColor: '#E5E7EB' }} />

      {/* Menú de navegación */}
      <Box sx={{ flex: 1, px: 2, py: 2 }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '10px',
                  minHeight: 48,
                  px: 2,
                  py: 1.5,
                  transition: 'all 0.2s ease-in-out',
                  '&.Mui-selected': {
                    backgroundColor: `${item.color}08`,
                    color: item.color,
                    fontWeight: 600,
                    transform: 'translateX(4px)',
                    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.1)',
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                  },
                  '&:hover': {
                    backgroundColor: `${item.color}04`,
                    transform: 'translateX(2px)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: location.pathname === item.path ? item.color : '#6B7280',
                  transition: 'color 0.2s ease-in-out'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    fontSize: '0.95rem',
                    color: location.pathname === item.path ? item.color : '#374151'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer del drawer */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
          borderRadius: '12px',
          p: 2.5,
          textAlign: 'center',
          border: '1px solid #E5E7EB'
        }}>
          <Typography variant="body2" sx={{ 
            fontWeight: 600, 
            mb: 0.5,
            color: '#1F2937',
            fontFamily: 'Inter, sans-serif'
          }}>
            Sistema Operativo
          </Typography>
          <Typography variant="caption" sx={{ 
            color: '#6B7280',
            fontFamily: 'Inter, sans-serif',
            display: 'block'
          }}>
            ✅ Conectado • 🔄 Sincronizado
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <NotificationContext.Provider value={notification}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: '#FFFFFF',
            color: '#1F2937',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid #E5E7EB',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Toolbar sx={{ minHeight: '72px !important', px: { xs: 2, sm: 3 } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                color: '#1E3A8A'
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                color: '#1F2937',
                letterSpacing: '-0.025em'
              }}>
                {getCurrentPageTitle()}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#6B7280',
                fontFamily: 'Inter, sans-serif',
                mt: 0.5
              }}>
                Gestión profesional de mascotas
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton 
                sx={{ 
                  color: '#6B7280',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(30, 58, 138, 0.04)',
                    color: '#1E3A8A',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Badge 
                  badgeContent={notification.notifications.length || 0} 
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#EF4444',
                      color: 'white',
                      fontSize: '0.75rem',
                      minWidth: '18px',
                      height: '18px'
                    }
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* Drawer de navegación */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Drawer móvil */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Drawer desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderRight: '1px solid #E5E7EB'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        
        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: '#F9FAFB',
            minHeight: '100vh',
          }}
        >
          <Toolbar sx={{ minHeight: '72px !important' }} />
          <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
            <Routes>
              <Route path="/" element={<PetCalendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/settings" element={<TestPage />} />
            </Routes>
          </Container>
        </Box>

        {/* Sistema de notificaciones */}
        <NotificationToast
          notifications={notification.notifications}
          onRemove={notification.removeNotification}
        />
      </Box>
    </NotificationContext.Provider>
  );
};

export default Layout; 