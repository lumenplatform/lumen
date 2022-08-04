import { ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#019a76',
      contrastText: 'white',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#ff0000',
    },
  },
  typography: {
    fontFamily: 'Inter,sans-serif',
    button: {
      fontWeight: 600,
    },
    fontWeightMedium: 600,
    fontWeightRegular: 400,
  },
};
