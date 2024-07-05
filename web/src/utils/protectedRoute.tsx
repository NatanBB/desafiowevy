import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedProps } from '../types/commonTypes';

export const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated ? children : <Navigate to="/login" replace />
  );
};