import {Logo} from "./Logo";

const Header = () => {
    return (
        <header className="fixed top-0 bg-white h-20 w-screen px-20 flex flex-row justify-between items-center drop-shadow-header">
            <Logo color="blue"/>

            <div className="flex flex-row items-center gap-10">
                <a href="#">Breeze</a>
                <a href="#">Mapas</a>
                <a href="/login" className="h-fit px-4 py-3 rounded-lg text-primary bg-transparent border-gray border-2">Iniciar sesión</a>
            </div>
        </header>
    );
};

export default Header;
