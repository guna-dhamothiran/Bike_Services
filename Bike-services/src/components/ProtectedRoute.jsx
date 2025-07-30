import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useAuth();
  
  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (role) {
    if (role === 'owner' && auth.role !== 'owner') {
      return <Navigate to="/user-dashboard" />;
    }
    if (role === 'user' && auth.role === 'owner') {
      return <Navigate to="/owner-dashboard" />;
    }
  }

  return children;
};

export default ProtectedRoute;
