// FormPopUp Component (FormPopUp.tsx)
import { routes } from '../../routes/routes';
import { Link } from 'react-router-dom';

interface FormPopUpProps {
    togglePopup: () => void;
}

export const FormPopUp = ({ togglePopup }: FormPopUpProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={togglePopup}
        >
            <div className="w-1/3 rounded-lg bg-white px-10 py-5 opacity-100">
                <h3 className="font-medium">A continuación te pediremos:</h3>
                <label>
                    Estamos ofreciendo de forma gratuita a personas interesadas
                    en colaborar activamente con nuestro proyecto, ayudándonos a
                    recopilar y compartir datos de calidad. Si prefieres no
                    comprometerte a un uso activo, te recomendamos comprarlo
                    para que puedas utilizarlo según tus necesidades.
                </label>
                <div className="mt-8 grid w-full grid-cols-2 gap-4">
                    <button
                        onClick={togglePopup}
                        className="btn-primary w-full rounded-lg bg-gray py-2 text-lg font-medium text-offblack"
                    >
                        Cancelar
                    </button>
                    <Link
                        to={routes.SHOP.FREE_BREEZE}
                        className="btn-primary w-full rounded-lg bg-primary px-10 py-2 text-center text-xl font-medium text-offwhite"
                    >
                        Continuar
                    </Link>
                </div>
            </div>
        </div>
    );
};
