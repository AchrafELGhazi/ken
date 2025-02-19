import { useAuth } from '@/context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  return <Outlet />;
};
