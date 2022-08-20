import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useMemo } from 'react';
import AppRouter from './AppRouter';
import { ThemeContext } from './providers/ThemeModeProvider';
import { themeOptions } from './theme';
import { deepmerge } from '@mui/utils';

export function App() {
  const themeMode = useContext(ThemeContext);

  const theme = useMemo(() => {
    return createTheme(
      deepmerge(themeOptions, { palette: { mode: themeMode.mode } })
    );
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
