import { createContext, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

export const ThemeContext = createContext<{
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}>(null!);

export default function ThemeModeProvider(props: any) {
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>(
    'theme-context',
    'light',
    { raw: true }
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(mode === 'light' ? 'dark' : 'light');
      },
      mode: mode ? mode : 'light',
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      {props.children}
    </ThemeContext.Provider>
  );
}
