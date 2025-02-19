import { isNGOUser, useAuth } from '@/context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const NGOGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isNGOUser(user)) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
