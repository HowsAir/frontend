// AuthRedirect.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { routes } from '../routes/routes';

interface AuthRedirectProps {
    children: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const { isAuthenticated, isLoading, roleId } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="m-auto mt-20 w-14">
                <img
                    alt="cargando..."
                    src="https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif"
                ></img>
            </div>
        );
    }

    if (isAuthenticated) {
        // Redirect based on role
        if (roleId === 1) {
            // Assuming 1 is admin's roleId
            return (
                <Navigate
                    to="/admin-dashboard"
                    state={{ from: location }}
                    replace
                />
            );
        }
        if (roleId === 2) {
            // Assuming 2 is user's roleId
            return (
                <Navigate
                    to={roleId === 2 ? routes.ADMIN.INDEX : routes.USER.INDEX}
                    state={{ from: location }}
                    replace
                />
            );
        }
    }

    return <>{children}</>;
};
