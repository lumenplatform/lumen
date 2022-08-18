import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green, orange } from '@mui/material/colors';
import AppRouter from './AppRouter';
import { themeOptions } from './theme';

// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
export function App() {
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
