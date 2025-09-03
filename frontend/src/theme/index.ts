import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Theme } from '../types';

export const lightTheme: Theme = {
  mode: 'light',
  primary: '#1976d2',
  secondary: '#dc004e',
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#212121',
  error: '#d32f2f',
  warning: '#ed6c02',
  success: '#2e7d32',
  info: '#0288d1'
};

export const darkTheme: Theme = {
  mode: 'dark',
  primary: '#90caf9',
  secondary: '#f48fb1',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#ffffff',
  error: '#f44336',
  warning: '#ff9800',
  success: '#4caf50',
  info: '#2196f3'
};

export const createMuiTheme = (theme: Theme) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: theme.mode,
      primary: {
        main: theme.primary,
        light: theme.mode === 'light' ? '#42a5f5' : '#bbdefb',
        dark: theme.mode === 'light' ? '#1565c0' : '#1976d2',
        contrastText: theme.mode === 'light' ? '#ffffff' : '#000000'
      },
      secondary: {
        main: theme.secondary,
        light: theme.mode === 'light' ? '#ff5983' : '#ffb3d1',
        dark: theme.mode === 'light' ? '#9a0036' : '#c2185b',
        contrastText: theme.mode === 'light' ? '#ffffff' : '#000000'
      },
      background: {
        default: theme.background,
        paper: theme.surface
      },
      text: {
        primary: theme.text,
        secondary: theme.mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'
      },
      error: {
        main: theme.error
      },
      warning: {
        main: theme.warning
      },
      success: {
        main: theme.success
      },
      info: {
        main: theme.info
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43
      }
    },
    shape: {
      borderRadius: 12
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '10px 24px'
          },
          contained: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            borderRadius: 16,
            border: `1px solid ${theme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600
          }
        }
      }
    }
  };

  return createTheme(themeOptions);
};
