import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Pets as PetsIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Event as EventIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Mascotas Registradas',
      value: '156',
      change: '+12%',
      icon: <PetsIcon />,
      color: '#1E3A8A',
      bgColor: '#EFF6FF',
    },
    {
      title: 'Clientes Activos',
      value: '89',
      change: '+8%',
      icon: <PeopleIcon />,
      color: '#3B82F6',
      bgColor: '#DBEAFE',
    },
    {
      title: 'Ingresos del Mes',
      value: '$2,450',
      change: '+15%',
      icon: <MoneyIcon />,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      title: 'Citas Completadas',
      value: '124',
      change: '+22%',
      icon: <CheckCircleIcon />,
      color: '#60A5FA',
      bgColor: '#F0F9FF',
    },
  ];

  const recentAppointments = [
    {
      pet: 'Max',
      owner: 'Juan Pérez',
      service: 'Baño y Corte',
      time: '10:00 AM',
      status: 'En progreso',
      avatar: '🐕',
    },
    {
      pet: 'Luna',
      owner: 'María García',
      service: 'Corte de Uñas',
      time: '11:30 AM',
      status: 'Pendiente',
      avatar: '🐱',
    },
    {
      pet: 'Rocky',
      owner: 'Carlos López',
      service: 'Baño Completo',
      time: '2:00 PM',
      status: 'Completado',
      avatar: '🐕‍🦺',
    },
    {
      pet: 'Mimi',
      owner: 'Ana Torres',
      service: 'Peluquería Completa',
      time: '3:30 PM',
      status: 'Confirmado',
      avatar: '🐩',
    },
  ];

  const popularServices = [
    { name: 'Baño y Secado', percentage: 85, count: 45, color: '#1E3A8A' },
    { name: 'Corte de Pelo', percentage: 70, count: 32, color: '#3B82F6' },
    { name: 'Corte de Uñas', percentage: 60, count: 28, color: '#60A5FA' },
    { name: 'Limpieza Dental', percentage: 40, count: 18, color: '#93C5FD' },
    { name: 'Desparasitación', percentage: 30, count: 12, color: '#1E40AF' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En progreso': return '#F59E0B';
      case 'Completado': return '#10B981';
      case 'Confirmado': return '#3B82F6';
      case 'Pendiente': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        mb: 4 
      }}>
        <Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            color: '#1F2937',
            letterSpacing: '-0.025em',
            mb: 1
          }}>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#6B7280',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem'
          }}>
            Resumen general de tu negocio
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
            borderRadius: '12px',
            px: 3,
            py: 1.5,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
              boxShadow: '0 6px 8px -1px rgba(59, 130, 246, 0.4)',
            }
          }}
        >
          Nueva Cita
        </Button>
      </Box>

      {/* Estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${stat.color}08 100%)`,
              border: `1px solid ${stat.color}15`,
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 25px -5px ${stat.color}30`,
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: stat.color,
                      width: 48,
                      height: 48,
                      boxShadow: `0 4px 8px ${stat.color}30`,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      backgroundColor: '#10B981',
                      color: 'white',
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  mb: 0.5, 
                  color: stat.color,
                  fontFamily: 'Poppins, sans-serif',
                  letterSpacing: '-0.025em'
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#374151',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Citas de hoy */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: '20px', 
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    backgroundColor: '#EFF6FF', 
                    color: '#1E3A8A',
                    mr: 2,
                    width: 40,
                    height: 40
                  }}>
                    <EventIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      fontFamily: 'Poppins, sans-serif',
                      color: '#1F2937',
                      mb: 0.5
                    }}>
                      Citas de Hoy
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#6B7280',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {recentAppointments.length} citas programadas
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#1E3A8A',
                    color: '#1E3A8A',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'none'
                  }}
                >
                  Ver todas
                </Button>
              </Box>
              
              <List sx={{ p: 0 }}>
                {recentAppointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: '#F3F4F6', 
                          fontSize: '1.5rem',
                          width: 48,
                          height: 48
                        }}>
                          {appointment.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ 
                              fontWeight: 600,
                              fontFamily: 'Inter, sans-serif',
                              color: '#1F2937'
                            }}>
                              {appointment.pet}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: '#6B7280',
                              fontFamily: 'Inter, sans-serif'
                            }}>
                              • {appointment.owner}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Typography variant="body2" sx={{ 
                              color: '#374151',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 500
                            }}>
                              {appointment.service}
                            </Typography>
                            <Chip
                              label={appointment.time}
                              size="small"
                              icon={<ScheduleIcon sx={{ fontSize: '16px !important' }} />}
                              sx={{ 
                                height: 28,
                                backgroundColor: '#F3F4F6',
                                color: '#374151',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500
                              }}
                            />
                            <Chip
                              label={appointment.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(appointment.status),
                                color: 'white',
                                height: 28,
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentAppointments.length - 1 && (
                      <Divider sx={{ borderColor: '#F3F4F6', mx: 0 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Servicios más populares */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  backgroundColor: '#ECFDF5', 
                  color: '#10B981',
                  mr: 2,
                  width: 40,
                  height: 40
                }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1F2937',
                    mb: 0.5
                  }}>
                    Servicios Populares
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6B7280',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Últimos 30 días
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                {popularServices.map((service, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600,
                        fontFamily: 'Inter, sans-serif',
                        color: '#1F2937'
                      }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#6B7280',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8rem'
                      }}>
                        {service.count} citas
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={service.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#F3F4F6',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: service.color,
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ 
                      color: service.color,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      mt: 0.5,
                      display: 'block'
                    }}>
                      {service.percentage}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Mensaje motivacional */}
      <Box sx={{ mt: 5 }}>
        <Card sx={{ 
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: 'white',
          border: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            transform: 'translate(50%, -50%)',
          }
        }}>
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              textAlign: { xs: 'center', md: 'left' },
              gap: 3
            }}>
              <Box>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  fontFamily: 'Poppins, sans-serif',
                  mb: 1.5,
                  letterSpacing: '-0.025em'
                }}>
                  🎉 ¡Excelente trabajo hoy!
                </Typography>
                <Typography variant="body1" sx={{ 
                  opacity: 0.95,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                  fontSize: '1.1rem'
                }}>
                  Has completado 8 de 12 citas programadas. Tu dedicación mantiene a los clientes y sus mascotas felices.
                </Typography>
              </Box>
              <Avatar sx={{ 
                bgcolor: 'rgba(255,255,255,0.15)', 
                width: 72, 
                height: 72,
                backdropFilter: 'blur(10px)'
              }}>
                <StarIcon sx={{ fontSize: 36, color: '#FCD34D' }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard; 