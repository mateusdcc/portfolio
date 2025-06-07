import Achievements from './components/Achievements';
import HeroBanner from './components/HeroBanner'; // Import HeroBanner
import { CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7', // Deep Purple
    },
    secondary: {
      main: '#00bcd4', // Cyan
    },
    background: {
      default: '#121212', // Very dark grey, almost black
      paper: '#1e1e1e',   // Slightly lighter dark grey for surfaces
    },
    text: {
      primary: '#e0e0e0', // Light grey for primary text
      secondary: '#b0b0b0', // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#e0e0e0', // Ensure header text is light
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.1rem',
      color: '#b0b0b0', // Ensure subtitle text is visible
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))', // Subtle gloss effect
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box 
          component="header" 
          sx={{ 
            py: 4, 
            px: 2, 
            textAlign: 'center', 
            backgroundColor: 'primary.dark', // Use a darker shade of the primary color
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant="h4" component="h1">
            Mateus DCC
          </Typography>
          <Typography variant="subtitle1">
            Software Developer | System Analyst | Open Source Contributor
          </Typography>
        </Box>
        {/* Hero Banner Section */}
        <HeroBanner /> 
        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Achievements />
        </Box>
        <Box 
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.background.paper, 
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} Mateus DCC. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with React, Vite, and Material UI.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
