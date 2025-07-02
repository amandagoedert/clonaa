// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Array of allowed roles (e.g., ['admin', 'user'])
  redirectPath?: string; // Path to redirect if user is not authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/login', // Default to /login if not specified
}) => {
  const { isAuthenticated, user, loading } = useAuth(); // Get authentication state

  // If still loading authentication state (e.g., from localStorage)
  if (loading) {
    // You can render a spinner or a placeholder here
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If the route requires specific roles and the user does not have one of them
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to the main page or an "access denied" page
    return <Navigate to="/" replace />; // Example: redirects to the main dashboard
  }

  // If everything is OK, render the route's child components
  return <Outlet />;
};

export default ProtectedRoute;
