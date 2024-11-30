// AuthRedirect.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { routes } from '../routes/routes';

interface AuthRedirectProps {
    children: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const { isAuthenticated, isLoading, roleId } = useAuth();

    // Show loading spinner while authentication state is loading
    if (isLoading) {
        return (
            <div className="m-auto mt-20 w-14">
                <img
                    alt="Cargando..."
                    src="https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif"
                />
            </div>
        );
    }

    // If the user is authenticated, block access to these routes
    if (isAuthenticated) {
        if (roleId === 1) {
            // Redirect users to their dashboard
            return <Navigate to={routes.USER.INDEX} replace />;
        } else if (roleId === 2) {
            // Redirect admins to their dashboard
            return <Navigate to={routes.ADMIN.INDEX} replace />;
        }
    }

    // If the user is not authenticated, allow access to the route
    return <>{children}</>;
};
