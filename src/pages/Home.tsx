import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Mateus DCC
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Software Developer | System Analyst | Open Source Contributor
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
