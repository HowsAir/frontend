import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';

const PaymentCancel = () => {
    const navigate = useNavigate();

    // Redirigir al usuario a la página de producto después de 5 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(routes.SHOP.PRODUCT);
        }, 5000);

        return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }, [navigate]);

    return (
        <div className="bg-gray-100 m-auto flex min-h-screen w-fit flex-col justify-center">
            <h2>Pago Cancelado</h2>
            <p>
                Parece que tu pago ha sido cancelado. Por favor, inténtalo de
                nuevo.
            </p>
            <p className="text-lg text-neutral-400">
                Te estamos redirigiendo a la página del producto...
            </p>
        </div>
    );
};

export default PaymentCancel;
