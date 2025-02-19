import { isClientUser, useAuth } from '@/context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ClientGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isClientUser(user)) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
