/* eslint-disable no-restricted-globals */
import { useAuth0, User } from '@auth0/auth0-react';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import { createContext, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchUser, getCourseById } from '../api';
import InstructorOnboarding from '../pages/auth/InstructorOnboarding';
import AppBanner from './AppBanner';
declare global {
  interface Window {
    electron: any;
  }
}

export type UserRole = 'instructor' | 'student' | 'any';
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
    enabled: isAuthenticated && !!user && !auth0Loading,
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
  role: UserRole;
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
    <Backdrop open={true} invisible>
      <Stack spacing={3} alignItems="center">
        <img src="/assets/icons/logo_horiz.png" style={{ width: '12rem' }} />
        <CircularProgress color="inherit" />
      </Stack>
    </Backdrop>
  );
}

export function RequireDesktop({
  children,
  bypass,
}: {
  children: JSX.Element;
  bypass: boolean;
}) {
  const { courseId } = useParams();
  const { data: course } = useQuery(
    ['courses', courseId],
    () => getCourseById(courseId!),
    { enabled: !!courseId }
  );

  if (!bypass && courseId) {
    if (
      course &&
      course.settings?.isDesktopOnly === 'YES' &&
      !window.electron
    ) {
      return <AppBanner link={'lumen-desktop://open?url=' + location.href} />;
    }
    return children;
  } else {
    return children;
  }
}
