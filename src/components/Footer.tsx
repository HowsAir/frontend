import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const Footer = () => {
    return (
        <footer className="relative bg-footer bg-cover h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-b from-offwhite from-10% to-transparent to-50%"></div>
            <div className="relative z-10 h-fit flex flex-row justify-between px-40 pt-40">
                <div className="flex flex-col pt-12">
                    <Link className="footer-link" to={'/terms-and-privacy'}>
                        Términos y condiciones
                    </Link>
                    <Link className="footer-link" to={'/terms-and-privacy'}>
                        Política de privacidad
                    </Link>
                </div>
                <div className='flex flex-col items-center'>
                    <Logo color="offwhite"></Logo>
                    <label className='text-offwhite font-extralight mt-2'>© 2024 HowsAir Todos los derechos reservados</label>
                </div>
                <div className="flex flex-col pt-12">
                    <Link className="footer-link" to={'/contact'}>
                        Contáctanos
                    </Link>
                    <Link className="footer-link" to={'/user-manual'}>
                        Manual de usuario
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
