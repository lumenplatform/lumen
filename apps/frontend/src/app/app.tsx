import { CssBaseline } from '@mui/material';
import { login } from './api';
import AppRouter from './AppRouter';

// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
export function App() {
  // const { data, refetch } = useQuery('users', fetchUsers);

  function getToken() {
    login().then((r) => {
      localStorage.setItem('token', r.data.token);
      // refetch();
    });
  }

  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
}

export default App;
