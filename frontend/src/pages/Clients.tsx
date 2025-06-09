import React, { useState } from 'react';
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
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  pets: string[];
  status: 'Activo' | 'Inactivo';
  notes?: string;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+1234567890',
      address: 'Av. Principal 123, Ciudad',
      pets: ['Max'],
      status: 'Activo',
      notes: 'Cliente frecuente, muy puntual'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+1234567891',
      address: 'Calle Secundaria 456, Ciudad',
      pets: ['Luna', 'Milo'],
      status: 'Activo',
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+1234567892',
      address: 'Plaza Central 789, Ciudad',
      pets: ['Rocky'],
      status: 'Activo',
      notes: 'Prefiere citas por la mañana'
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleCreateClient = () => {
    const client: Client = {
      id: clients.length + 1,
      ...newClient,
      pets: [],
      status: 'Activo',
    };
    setClients([...clients, client]);
    setOpenDialog(false);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewClient({ ...newClient, [field]: value });
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.pets.some(pet => pet.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Gestión de Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Registrar Cliente
        </Button>
      </Box>

      {/* Barra de búsqueda */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, email, teléfono o mascotas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      {/* Lista de clientes */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
        {filteredClients.map((client) => (
          <Card key={client.id} sx={{ borderRadius: 2, '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 48, height: 48 }}>
                    {getInitials(client.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {client.name}
                    </Typography>
                    <Chip
                      label={client.status}
                      size="small"
                      color={client.status === 'Activo' ? 'success' : 'default'}
                    />
                  </Box>
                </Box>
                <Box>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ space: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {client.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {client.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HomeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {client.address}
                  </Typography>
                </Box>
              </Box>

              {client.pets.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PetsIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Mascotas:
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {client.pets.map((pet, index) => (
                      <Chip
                        key={index}
                        label={pet}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {client.notes && (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
                  <strong>Notas:</strong> {client.notes}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredClients.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No se encontraron clientes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Registra el primer cliente'}
          </Typography>
        </Box>
      )}

      {/* Dialog para registrar nuevo cliente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Nombre completo"
              value={newClient.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={newClient.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <TextField
              fullWidth
              label="Teléfono"
              value={newClient.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <TextField
              fullWidth
              label="Dirección"
              value={newClient.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notas (opcional)"
              value={newClient.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreateClient}>
            Registrar Cliente
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clients; 