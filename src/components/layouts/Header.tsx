import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';
import { routes } from '../../routes/routes';
import * as apiClient from '../../api/apiClient'; // Adjust the import path as necessary
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

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-primary font-semibold'
            : 'transition-colors duration-300 ease-in-out hover:text-primary';

    return (
        <header className="fixed top-0 z-50 flex h-20 w-screen flex-row items-center justify-between bg-white px-20 drop-shadow-header transition-all duration-500 ease-in-out hover:drop-shadow-headerHover">
            <Logo color="primary" />

            <div className="flex flex-row items-center gap-10">
                {/* Conditional rendering based on auth status */}
                {isAuthenticated ? (
                    <>
                        {/* Admin-only links */}
                        {roleId === 2 && (
                            <>
                                <NavLink
                                    to={routes.ADMIN.USERS}
                                    className={getLinkClass}
                                >
                                    Usuarios
                                </NavLink>

                                <NavLink
                                    to={routes.ADMIN.MAPS}
                                    className={getLinkClass}
                                >
                                    Mapas
                                </NavLink>
                            </>
                        )}

                        {/* User-only links */}
                        {roleId === 1 && (
                            <>
                                <NavLink
                                    to={routes.USER.INDEX}
                                    className={getLinkClass}
                                >
                                    Portal
                                </NavLink>
                                <NavLink
                                    to={routes.USER.NODE}
                                    className={getLinkClass}
                                >
                                    Mi nodo
                                </NavLink>
                                <NavLink
                                    to={routes.HOME.MAPS}
                                    className={getLinkClass}
                                >
                                    Mapas
                                </NavLink>
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
                                    className="absolute left-0 top-1 size-8"
                                    src="../../public/icons/logout-icon.svg"
                                    alt="Cerrar sesión"
                                ></img>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink
                            to={routes.SHOP.PRODUCT}
                            className={getLinkClass}
                        >
                            Breeze
                        </NavLink>
                        <NavLink to={routes.HOME.MAPS} className={getLinkClass}>
                            Mapas
                        </NavLink>
                        <NavLink
                            to={routes.AUTH.LOGIN}
                            className="clickable h-fit rounded-lg border-2 border-gray bg-transparent px-4 py-3 font-medium text-primary transition-all duration-500 ease-in-out hover:border-sky-300 hover:bg-sky-100"
                        >
                            Iniciar sesión
                        </NavLink>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
