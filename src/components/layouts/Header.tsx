import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';
import { routes } from '../../routes/routes';
import * as apiClient from '../../api/apiClient'; // Adjust the import path as necessary
import LogoutIcon from '../icons/LogoutIcon';
import ProfileHeader from './ProfileHeader';

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
                {/* Conditional rendering based on auth status */}
                {isAuthenticated ? (
                    <>
                        {/* Admin-only links */}
                        {roleId === 2 && (
                            <Link
                                to={routes.ADMIN.INDEX}
                                className="hover:text-primary-dark text-primary"
                            >
                                Administración
                            </Link>
                        )}

                        {/* User-only links */}
                        {roleId === 1 && (
                            <>
                                <Link
                                    to={routes.HOME.MAPS}
                                    className="transition-colors duration-300 ease-in-out hover:text-primary"
                                >
                                    Mapas
                                </Link>
                                <Link
                                    to={routes.USER.INDEX}
                                    className="transition-colors duration-300 ease-in-out hover:text-primary"
                                >
                                    Mi nodo
                                </Link>
                                <Link
                                    to={routes.USER.START}
                                    className="transition-colors duration-300 ease-in-out hover:text-primary"
                                >
                                    Inicio
                                </Link>
                            </>
                        )}

                        {/* Profile and Logout buttons */}
                        <div className="flex items-center gap-4">
                            <ProfileHeader />
                            <button className="relative size-10 rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-sky-100">
                                <img
                                    src="../../public/icons/alert-icon.svg"
                                    alt="alertas"
                                    className="absolute left-1 top-1 size-8"
                                ></img>
                            </button>
                            <button
                                className="relative size-10 rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-sky-100"
                                onClick={async () => await handleLogout()}
                            >
                                <img
                                    className="absolute left-1 top-1 size-8"
                                    src="../../public/icons/logout-icon.svg"
                                    alt="Cerrar sesión"
                                ></img>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to={routes.SHOP.PRODUCT}>Breeze</Link>
                        <Link to={routes.HOME.MAPS}>Mapas</Link>
                        <Link
                            to={routes.AUTH.LOGIN}
                            className="clickable h-fit rounded-lg border-2 border-gray bg-transparent px-4 py-3 font-medium text-primary transition-all duration-500 ease-in-out hover:border-sky-300 hover:bg-sky-100"
                        >
                            Iniciar sesión
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
