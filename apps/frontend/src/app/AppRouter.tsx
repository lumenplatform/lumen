import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboad';
import { LoginPage } from './pages/Login';

export default function () {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

const AuthLayout = (props: any) => (
  <div>
    Testee<Outlet></Outlet>
  </div>
);
