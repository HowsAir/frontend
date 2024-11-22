import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { routes } from '../../routes/routes';

const Header = () => {
    return (
        <header className="fixed top-0 z-50 flex h-20 w-screen flex-row items-center justify-between bg-white px-20 drop-shadow-header">
            <Logo color="primary" />

            <div className="flex flex-row items-center gap-10">
                <Link to={routes.SHOP.PRODUCT}>Breeze</Link>
                <Link to={routes.HOME.MAPS}>Mapas</Link>
                <Link
                    to={routes.AUTH.LOGIN}
                    className="clickable h-fit rounded-lg border-2 border-gray bg-transparent px-4 py-3 font-medium text-primary transition-all duration-500 ease-in-out hover:border-sky-300 hover:bg-sky-100"
                >
                    Iniciar sesión
                </Link>
            </div>
        </header>
    );
};

export default Header;
