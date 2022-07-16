import { useAuth0, User } from '@auth0/auth0-react';
import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, useContext } from 'react';

interface AuthContextType {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (opt: { redirectURL: string }) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();

  const signIn = (opt: { redirectURL: string }) => {
    loginWithRedirect({
      redirectUri: opt.redirectURL,
    });
  };

  const signOut = () => {
    logout();
  };

  const value = { user, isLoading, signIn, signOut, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  if (!auth.isLoading) {
    if (auth.isAuthenticated) return children;

    auth.signIn({
      // eslint-disable-next-line no-restricted-globals
      redirectURL: location.href,
    });
  }

  return (
    <Backdrop sx={{}} open={true} invisible>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
