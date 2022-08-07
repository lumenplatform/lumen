import { useAuth0, User } from '@auth0/auth0-react';
import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from '../api';
import InstructorOnboarding from '../pages/auth/InstructorOnboarding';

interface AuthContextType {
  user?: User;
  appUser: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (opt: { redirectURL: string }) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokenFetched, setTokenFetched] = useState(false);

  const {
    user,
    isAuthenticated,
    isLoading: auth0Loading,
    logout,
    loginWithRedirect,
    getIdTokenClaims,
  } = useAuth0();

  useEffect(() => {
    const setToken = async () => {
      const token = await getIdTokenClaims();
      if (token) {
        localStorage.setItem('lumen_token', token.__raw);
      } else {
        localStorage.removeItem('lumen_token');
      }
      setTokenFetched(true);
    };

    setToken();
  }, [isAuthenticated, getIdTokenClaims, user?.sub]);

  const { data: appUser, isLoading: userLoading } = useQuery('me', fetchUser, {
    enabled: !!tokenFetched,
  });

  const signIn = (opt: { redirectURL: string }) => {
    loginWithRedirect({
      redirectUri: opt.redirectURL,
    });
  };

  const signOut = () => {
    logout();
  };

  const isLoading = auth0Loading || userLoading;

  const value = { user, isLoading, signIn, signOut, isAuthenticated, appUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({
  children,
  role,
}: {
  children: JSX.Element;
  role: 'instructor' | 'student' | 'any';
}) {
  const auth = useAuth();
  if (!auth.isLoading) {
    console.log(auth);
    if (auth.isAuthenticated && auth.appUser) {
      if (role === 'instructor' && !auth.appUser.organization) {
        return <InstructorOnboarding />;
      }
      return children;
    }

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
