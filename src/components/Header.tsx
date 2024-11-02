import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Header = () => {
    return (
        <header className="fixed z-50 top-0 bg-white h-20 w-screen px-20 flex flex-row justify-between items-center drop-shadow-header">
            <Logo color="primary" />

            <div className="flex flex-row items-center gap-10">
                <Link to="#">Breeze</Link>
                <Link to="#">Mapas</Link>
                <Link
                    to="/login"
                    className="font-medium h-fit px-4 py-3 rounded-lg text-primary bg-transparent border-gray border-2"
                >
                    Iniciar sesión
                </Link>
            </div>
        </header>
    );
};

export default Header;
