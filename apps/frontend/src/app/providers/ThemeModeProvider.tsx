import { createContext, useState, useMemo } from 'react';

export const ThemeContext = createContext<{
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}>(null!);

export default function ThemeModeProvider(props: any) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      {props.children}
    </ThemeContext.Provider>
  );
}
