import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is provided and doesn't match the user's role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
