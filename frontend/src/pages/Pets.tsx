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
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  phone: string;
  notes?: string;
  status: 'Activo' | 'Inactivo';
}

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: 1,
      name: 'Max',
      species: 'Perro',
      breed: 'Labrador',
      age: 3,
      owner: 'Juan Pérez',
      phone: '+1234567890',
      status: 'Activo',
      notes: 'Muy enérgico, le gusta jugar'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      breed: 'Persa',
      age: 2,
      owner: 'María García',
      phone: '+1234567891',
      status: 'Activo',
    },
    {
      id: 3,
      name: 'Rocky',
      species: 'Perro',
      breed: 'Bulldog',
      age: 5,
      owner: 'Carlos López',
      phone: '+1234567892',
      status: 'Activo',
      notes: 'Problemas respiratorios, cuidado especial'
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    owner: '',
    phone: '',
    notes: '',
  });

  const species = ['Perro', 'Gato', 'Conejo', 'Hámster', 'Ave', 'Reptil'];

  const handleCreatePet = () => {
    const pet: Pet = {
      id: pets.length + 1,
      ...newPet,
      age: parseInt(newPet.age),
      status: 'Activo',
    };
    setPets([...pets, pet]);
    setOpenDialog(false);
    setNewPet({
      name: '',
      species: '',
      breed: '',
      age: '',
      owner: '',
      phone: '',
      notes: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewPet({ ...newPet, [field]: value });
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSpeciesIcon = (species: string) => {
    return <PetsIcon />;
  };

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case 'Perro':
        return '#4caf50';
      case 'Gato':
        return '#ff9800';
      case 'Conejo':
        return '#e91e63';
      case 'Ave':
        return '#2196f3';
      default:
        return '#9c27b0';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Gestión de Mascotas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Registrar Mascota
        </Button>
      </Box>

      {/* Barra de búsqueda */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, dueño, especie o raza..."
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

      {/* Lista de mascotas */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 3 }}>
        {filteredPets.map((pet) => (
          <Card key={pet.id} sx={{ borderRadius: 2, '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: getSpeciesColor(pet.species), mr: 2 }}>
                    {getSpeciesIcon(pet.species)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {pet.name}
                    </Typography>
                    <Chip
                      label={pet.status}
                      size="small"
                      color={pet.status === 'Activo' ? 'success' : 'default'}
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

              <Box sx={{ space: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Especie:</strong> {pet.species}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Raza:</strong> {pet.breed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Edad:</strong> {pet.age} años
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Dueño:</strong> {pet.owner}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Teléfono:</strong> {pet.phone}
                </Typography>
                {pet.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                    <strong>Notas:</strong> {pet.notes}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredPets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PetsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No se encontraron mascotas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Registra la primera mascota'}
          </Typography>
        </Box>
      )}

      {/* Dialog para registrar nueva mascota */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registrar Nueva Mascota</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Nombre de la mascota"
              value={newPet.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              select
              label="Especie"
              value={newPet.species}
              onChange={(e) => handleInputChange('species', e.target.value)}
            >
              {species.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Raza"
              value={newPet.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
            />
            <TextField
              fullWidth
              label="Edad (años)"
              type="number"
              value={newPet.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
            <TextField
              fullWidth
              label="Nombre del dueño"
              value={newPet.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
            />
            <TextField
              fullWidth
              label="Teléfono"
              value={newPet.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notas (opcional)"
              value={newPet.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreatePet}>
            Registrar Mascota
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets; 