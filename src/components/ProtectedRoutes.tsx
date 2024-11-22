import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
}) => {
    const role = requiredRole ? (requiredRole === 'user' ? 1 : 2) : null;
    const { isAuthenticated, roleId } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole !== undefined && roleId !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};
