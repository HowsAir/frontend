import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
}) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirige si no está autenticado
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />; // Redirige si el rol no es suficiente
    }

    return <>{children}</>;
};
