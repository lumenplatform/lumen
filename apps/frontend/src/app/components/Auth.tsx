import { useAuth0, User } from '@auth0/auth0-react';
import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUser } from '../api';
import InstructorOnboarding from '../pages/auth/InstructorOnboarding';

interface AuthContextType {
  user?: User;
  appUser: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (opt: { redirectPath: string }) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

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

      const path = localStorage.getItem('redirect_path');
      if (path) {
        localStorage.removeItem('redirect_path');
        navigate(path);
      }
    };

    setToken();
  }, [isAuthenticated, getIdTokenClaims, user?.sub]);

  const { data: appUser, isLoading: userLoading } = useQuery('me', fetchUser, {
    enabled: isAuthenticated,
  });

  const signIn = (opt: { redirectPath: string }) => {
    localStorage.setItem('redirect_path', opt.redirectPath);
    // eslint-disable-next-line no-restricted-globals
    loginWithRedirect({ redirectUri: location.origin });
  };

  const signOut = () => {
    localStorage.removeItem('lumen_token');
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
  const location = useLocation();

  if (!auth.isLoading) {
    if (auth.isAuthenticated && auth.appUser) {
      if (role === 'instructor' && !auth.appUser.organization) {
        return <InstructorOnboarding />;
      }
      return children;
    }

    auth.signIn({ redirectPath: location.pathname });
  }

  return (
    <Backdrop sx={{}} open={true} invisible>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
