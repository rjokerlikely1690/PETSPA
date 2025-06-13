import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  CircularProgress,
  Backdrop,
  Fade,
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pets as PetsIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Import API and notification system
import { 
  appointmentApi, 
  Appointment as ApiAppointment,
  formatDateForApi,
  formatTimeForApi,
  statusMap 
} from '../services/api';
import { useAppNotification } from '../components/Layout';

// Local interface for form handling
interface AppointmentForm {
  petName: string;
  ownerName: string;
  service: string;
  date: Date | null;
  time: Date | null;
  notes: string;
}

const PetCalendar: React.FC = () => {
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<ApiAppointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState<AppointmentForm>({
    petName: '',
    ownerName: '',
    service: '',
    date: new Date(),
    time: new Date(),
    notes: '',
  });

  const { showNotification } = useAppNotification();

  const services = [
    'Baño completo',
    'Corte de pelo',
    'Limpieza dental',
    'Corte de uñas',
    'Consulta veterinaria',
    'Vacunación',
    'Desparasitación',
    'Cepillado',
    'Tratamiento antipulgas',
    'Limpieza de oídos',
  ];

  // Load appointments for selected date
  useEffect(() => {
    if (selectedDate) {
      loadAppointments(selectedDate);
    }
  }, [selectedDate]);

  const loadAppointments = async (date: Date) => {
    setLoading(true);
    try {
      const dateString = formatDateForApi(date);
      const response = await appointmentApi.getByDate(dateString);
      setAppointments(response);
    } catch (error) {
      console.error('Error loading appointments:', error);
      showNotification('error', 'Error al cargar citas', 'No se pudieron cargar las citas. Verifique la conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    return statusMap.backend[status as keyof typeof statusMap.backend] || status;
  };

  const resetForm = () => {
    setFormData({
      petName: '',
      ownerName: '',
      service: '',
      date: new Date(),
      time: new Date(),
      notes: '',
    });
    setEditingAppointment(null);
  };

  const handleOpenDialog = (appointment?: ApiAppointment) => {
    if (appointment) {
      // Edit mode
      setEditingAppointment(appointment);
      setFormData({
        petName: appointment.petName,
        ownerName: appointment.ownerName,
        service: appointment.service,
        date: parseISO(appointment.date + 'T00:00:00'),
        time: parseISO(`2000-01-01T${appointment.time}:00`),
        notes: appointment.notes || '',
      });
    } else {
      // Create mode
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const handleInputChange = (field: keyof AppointmentForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.petName.trim()) {
      showNotification('warning', 'Campos requeridos', 'El nombre de la mascota es obligatorio.');
      return false;
    }
    if (!formData.ownerName.trim()) {
      showNotification('warning', 'Campos requeridos', 'El nombre del dueño es obligatorio.');
      return false;
    }
    if (!formData.service) {
      showNotification('warning', 'Campos requeridos', 'Debe seleccionar un servicio.');
      return false;
    }
    if (!formData.date) {
      showNotification('warning', 'Campos requeridos', 'La fecha es obligatoria.');
      return false;
    }
    if (!formData.time) {
      showNotification('warning', 'Campos requeridos', 'La hora es obligatoria.');
      return false;
    }
    return true;
  };

  const handleSaveAppointment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const appointmentData = {
        petName: formData.petName.trim(),
        ownerName: formData.ownerName.trim(),
        service: formData.service,
        date: formatDateForApi(formData.date!),
        time: formatTimeForApi(formData.time!),
        notes: formData.notes.trim(),
        status: 'pending' as const,
      };

      if (editingAppointment) {
        // Update existing appointment
        await appointmentApi.update(editingAppointment.id!, appointmentData);
        showNotification('success', '¡Cita actualizada!', 'La cita se ha actualizado correctamente.');
      } else {
        // Create new appointment
        await appointmentApi.create(appointmentData);
        showNotification('success', '¡Cita creada!', 'La nueva cita se ha programado correctamente.');
      }

      handleCloseDialog();
      if (selectedDate) {
        await loadAppointments(selectedDate);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      showNotification('error', 'Error al guardar', 'No se pudo guardar la cita. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta cita?')) {
      return;
    }

    setLoading(true);
    try {
      await appointmentApi.delete(id);
      showNotification('success', 'Cita eliminada', 'La cita se ha eliminado correctamente.');
      if (selectedDate) {
        await loadAppointments(selectedDate);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      showNotification('error', 'Error al eliminar', 'No se pudo eliminar la cita. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setLoading(true);
    try {
      await appointmentApi.update(id, { status: newStatus as any });
      showNotification('success', 'Estado actualizado', 'El estado de la cita se ha actualizado.');
      if (selectedDate) {
        await loadAppointments(selectedDate);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('error', 'Error al actualizar', 'No se pudo actualizar el estado de la cita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Loading Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: 9998 }} open={loading}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" />
          <Typography variant="body1" sx={{ fontFamily: 'Inter, sans-serif' }}>
            Procesando...
          </Typography>
        </Box>
      </Backdrop>

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
            Calendario de Citas
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#6B7280',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem'
          }}>
            Gestiona las citas de tus clientes peludos
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
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

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' }, gap: 4 }}>
        {/* Selector de fecha */}
        <Card sx={{ 
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          height: 'fit-content'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ 
                backgroundColor: '#EFF6FF', 
                color: '#1E3A8A',
                mr: 2,
                width: 40,
                height: 40
              }}>
                <EventIcon />
              </Avatar>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif',
                color: '#1F2937'
              }}>
                Seleccionar Fecha
              </Typography>
            </Box>
            
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                    }
                  }
                },
              }}
            />
            
            <Box sx={{ 
              mt: 4, 
              p: 3, 
              backgroundColor: '#F9FAFB', 
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif',
                color: '#1F2937'
              }}>
                Resumen del día
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ 
                  color: '#6B7280',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Total de citas:
                </Typography>
                <Chip 
                  label={appointments.length}
                  size="small"
                  sx={{
                    backgroundColor: '#1E3A8A',
                    color: 'white',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </Box>
              {selectedDate && (
                <Typography variant="caption" sx={{ 
                  color: '#9CA3AF',
                  fontFamily: 'Inter, sans-serif',
                  mt: 1,
                  display: 'block'
                }}>
                  {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Lista de citas */}
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
                  backgroundColor: '#F0F9FF', 
                  color: '#3B82F6',
                  mr: 2,
                  width: 40,
                  height: 40
                }}>
                  <PetsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1F2937',
                    mb: 0.5
                  }}>
                    Citas del día
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#6B7280',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {appointments.length} citas programadas
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {appointments.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <EventIcon sx={{ fontSize: 64, color: '#9CA3AF', mb: 2 }} />
                <Typography variant="h6" sx={{ 
                  color: '#6B7280',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 1
                }}>
                  No hay citas programadas
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#9CA3AF',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Selecciona otra fecha o programa una nueva cita
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {appointments.map((appointment) => (
                  <Fade in={true} key={appointment.id}>
                    <ListItem
                      sx={{
                        border: '1px solid #E5E7EB',
                        borderRadius: '16px',
                        mb: 2,
                        p: 3,
                        backgroundColor: '#FFFFFF',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-1px)',
                        },
                        '&:last-child': { mb: 0 },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: '#EFF6FF',
                          color: '#1E3A8A',
                          width: 48,
                          height: 48,
                          fontSize: '1.5rem'
                        }}>
                          🐾
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#1F2937',
                                mb: 0.5
                              }}>
                                {appointment.petName}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: '#6B7280',
                                fontFamily: 'Inter, sans-serif'
                              }}>
                                {appointment.ownerName}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Chip
                                label={getStatusText(appointment.status)}
                                size="small"
                                color={getStatusColor(appointment.status) as any}
                                onClick={() => {
                                  const statuses = ['pending', 'in_progress', 'completed', 'cancelled'];
                                  const currentIndex = statuses.indexOf(appointment.status);
                                  const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                                  handleUpdateStatus(appointment.id!, nextStatus);
                                }}
                                sx={{ 
                                  cursor: 'pointer',
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 500
                                }}
                              />
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog(appointment)}
                                sx={{ 
                                  color: '#3B82F6',
                                  '&:hover': { backgroundColor: '#EFF6FF' }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => handleDeleteAppointment(appointment.id!)}
                                sx={{ 
                                  color: '#EF4444',
                                  '&:hover': { backgroundColor: '#FEF2F2' }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                              <Chip
                                label={`⏰ ${appointment.time}`}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderColor: '#1E3A8A',
                                  color: '#1E3A8A',
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 500
                                }}
                              />
                              <Chip
                                label={appointment.service}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderColor: '#10B981',
                                  color: '#10B981',
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 500
                                }}
                              />
                            </Box>
                            {appointment.notes && (
                              <Typography variant="body2" sx={{ 
                                color: '#6B7280',
                                fontFamily: 'Inter, sans-serif',
                                fontStyle: 'italic',
                                mt: 1,
                                p: 2,
                                backgroundColor: '#F9FAFB',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB'
                              }}>
                                💭 {appointment.notes}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  </Fade>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Dialog para nueva/editar cita */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              backgroundColor: '#EFF6FF', 
              color: '#1E3A8A',
              mr: 2,
              width: 40,
              height: 40
            }}>
              {editingAppointment ? <EditIcon /> : <AddIcon />}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                color: '#1F2937'
              }}>
                {editingAppointment ? 'Editar Cita' : 'Programar Nueva Cita'}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#6B7280',
                fontFamily: 'Inter, sans-serif'
              }}>
                {editingAppointment ? 'Modifica los datos de la cita' : 'Completa los datos para agendar'}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#6B7280' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 3, 
            mt: 1 
          }}>
            <TextField
              fullWidth
              label="Nombre de la mascota"
              value={formData.petName}
              onChange={(e) => handleInputChange('petName', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Nombre del dueño"
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                }
              }}
            />
            
            <TextField
              fullWidth
              select
              label="Servicio"
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                }
              }}
            >
              {services.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </TextField>
            
            <DatePicker
              label="Fecha"
              value={formData.date}
              onChange={(newValue) => handleInputChange('date', newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                    }
                  }
                },
              }}
            />
            
            <TimePicker
              label="Hora"
              value={formData.time}
              onChange={(newValue) => handleInputChange('time', newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                    }
                  }
                },
              }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notas adicionales"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Información especial sobre la mascota, alergias, comportamiento, etc."
              sx={{ 
                gridColumn: { md: 'span 2' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                }
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 4, pt: 0, gap: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#6B7280',
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB',
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAppointment}
            startIcon={<SaveIcon />}
            disabled={loading}
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
            {editingAppointment ? 'Actualizar Cita' : 'Programar Cita'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PetCalendar; 