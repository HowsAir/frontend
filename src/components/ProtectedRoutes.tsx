// ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: number[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
}) => {
    const { roleId, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="m-auto w-14 mt-20">
                <img alt='cargando...' src='https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif'></img>
            </div>
        );
    }

    if (!isAuthenticated || roleId === null) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(roleId)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};
