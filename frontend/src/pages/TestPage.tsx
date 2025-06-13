import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

const TestPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Configuración
      </Typography>
      
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <SettingsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Configuración del Sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta sección estará disponible próximamente
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestPage; 