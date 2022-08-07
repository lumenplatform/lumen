import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './app/app';
import { AuthProvider } from './app/components/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 1000 * 60 * 5 } },
});

root.render(
  <StrictMode>
    <Auth0Provider
      domain="lumn.eu.auth0.com"
      clientId="vZoMgK0kVQvoLfqVqzWrXPNmKD8bT7hS"
      redirectUri={window.location.origin}
      audience="https://lumn.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
