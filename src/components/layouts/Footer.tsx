import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Footer = () => {
    return (
        <footer className="relative h-[450px] bg-footer bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-offwhite from-10% to-transparent to-50%"></div>
            <div className="relative z-10 flex h-fit flex-row justify-between px-40 pt-40">
                <div className="flex flex-col pt-12">
                    <Link
                        className="mb-5 text-2xl text-offwhite leading-loose"
                        to={'/terms-and-privacy'}
                        target="_blank"
                    >
                        Términos, condiciones y <br className='' />
                        política de privacidad
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Logo color="offwhite"></Logo>
                    <label className="mt-2 font-extralight text-offwhite">
                        © 2024 HowsAir Todos los derechos reservados
                    </label>
                </div>
                <div className="flex flex-col pt-12">
                    <Link
                        className="mb-5 text-2xl text-offwhite"
                        to={'/contact'}
                    >
                        Contáctanos
                    </Link>
                    <Link
                        className="mb-5 text-2xl text-offwhite"
                        to={'/user-manual'}
                    >
                        Manual de usuario
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
