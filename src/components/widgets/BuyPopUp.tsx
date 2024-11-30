// BuyPopUp Component (BuyPopUp.tsx)
import { routes } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Details, Payment, Shipping } from '../icons';

interface BuyPopUpProps {
    togglePopup: () => void;
}

export const BuyPopUp = ({ togglePopup }: BuyPopUpProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={togglePopup}
        >
            <div className="w-1/3 rounded-lg bg-white px-10 py-5 opacity-100">
                <h3 className="font-medium">A continuación te pediremos:</h3>
                <div className="mt-4 w-full space-y-2">
                    <div className="inline-flex gap-2">
                        <div className="my-auto flex size-10 items-center justify-center rounded-full bg-primary text-2xl">
                            <Details color="#fff" />
                        </div>
                        <label>
                            <span className="font-medium">
                                Detalles personales:{' '}
                            </span>
                            al comprar el producto, <br /> serás registrado.
                        </label>
                    </div>
                    <div className="inline-flex gap-2">
                        <div className="my-auto flex size-10 items-center justify-center rounded-full bg-primary text-2xl">
                            <Shipping color="#fff" />
                        </div>
                        <label>
                            <span className="font-medium">
                                Detalles de envío:
                            </span>{' '}
                            necesitamos tu dirección <br /> para enviar el
                            producto.
                        </label>
                    </div>
                    <div className="inline-flex gap-2">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-2xl">
                            <Payment color="#fff" />
                        </div>
                        <label className="self-center">
                            <span className="font-medium">
                                Detalles de pago:
                            </span>{' '}
                            para procesar la compra.
                        </label>
                    </div>
                </div>
                <div className="mt-8 grid w-full grid-cols-2 gap-4">
                    <button
                        onClick={togglePopup}
                        className="btn-primary w-full rounded-lg bg-gray py-2 text-lg font-medium text-offblack"
                    >
                        Cancelar
                    </button>
                    <Link
                        to={routes.AUTH.REGISTER}
                        className="btn-primary w-full rounded-lg bg-primary px-10 py-2 text-center text-xl font-medium text-offwhite"
                    >
                        Continuar
                    </Link>
                </div>
            </div>
        </div>
    );
};
