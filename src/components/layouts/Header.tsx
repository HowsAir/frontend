import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';
import { routes } from '../../routes/routes';
import * as apiClient from '../../api/apiClient'; // Adjust the import path as necessary

const Header = () => {
    const { isAuthenticated, roleId, validateAuth } = useAuth();

    const handleLogout = async () => {
        try {
            await apiClient.logout();
            await validateAuth();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header className="fixed top-0 z-50 flex h-20 w-screen flex-row items-center justify-between bg-white px-20 drop-shadow-header">
            <Logo color="primary" />

            <div className="flex flex-row items-center gap-10">
                {/* Common links for all users */}
                <Link to={routes.SHOP.PRODUCT}>Breeze</Link>
                <Link to={routes.HOME.MAPS}>Mapas</Link>

                {/* Conditional rendering based on auth status */}
                {isAuthenticated ? (
                    <>
                        {/* Admin-only links */}
                        {roleId === 2 && (
                            <Link
                                to={routes.ADMIN.INDEX}
                                className="hover:text-primary-dark text-primary"
                            >
                                Dashboard
                            </Link>
                        )}

                        {roleId === 1 && (
                            <Link
                                to={routes.USER.INDEX}
                                className="hover:text-primary transition-colors duration-300 ease-in-out"
                            >
                                Mi nodo
                            </Link>
                        )}

                        {/* Profile and Logout buttons */}
                        <div className="flex items-center gap-4">
                            <Link
                                to={routes.USER.EDIT_PROFILE}
                                className="flex items-center gap-2 rounded-lg border-2 border-gray bg-transparent px-4 py-3 font-medium text-primary transition-all duration-500 ease-in-out hover:border-sky-300 hover:bg-sky-100"
                            >
                                <span>Perfil</span>
                            </Link>
                            <button onClick={async () => await handleLogout()}>Cerrar sesión</button>
                        </div>
                    </>
                ) : (
                    <Link
                        to={routes.AUTH.LOGIN}
                        className="clickable h-fit rounded-lg border-2 border-gray bg-transparent px-4 py-3 font-medium text-primary transition-all duration-500 ease-in-out hover:border-sky-300 hover:bg-sky-100"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
