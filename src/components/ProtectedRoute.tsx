
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // Store the current path for redirect after login
      localStorage.setItem('redirectAfterAuth', location.pathname);
    }
  }, [isLoggedIn, location.pathname]);

  if (!isLoggedIn) {
    toast.error("Please login to access this feature");
    return <Navigate to="/login" replace />;
  }

  return children;
};
