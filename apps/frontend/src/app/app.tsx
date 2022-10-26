import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useContext, useMemo } from 'react';
import AppRouter from './AppRouter';
import { ThemeContext } from './providers/ThemeModeProvider';
import { themeOptions } from './theme';
import { deepmerge } from '@mui/utils';
import { useQuery } from 'react-query';
import { fetchTheme } from './api';

export function App() {
  const themeMode = useContext(ThemeContext);
  const { data: dbTheme } = useQuery('theme-org', fetchTheme);

  const theme = useMemo(() => {
    return createTheme(
      deepmerge(dbTheme ? dbTheme : themeOptions, {
        palette: { mode: themeMode.mode },
      })
    );
  }, [themeMode, dbTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
