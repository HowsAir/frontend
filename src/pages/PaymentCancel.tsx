import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    // Redirigir al usuario a la página de registro después de 5 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/register');
        }, 5000);

        return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }, [navigate]);

    return (
        <div className="bg-gray-100 flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold">Pago Cancelado</h1>
                <p className="mb-4 text-lg">
                    Parece que tu pago ha sido rechazo. Por favor, inténtalo de
                    nuevo.
                </p>
                <p className="text-gray-600">
                    Serás redirigido a la página de registro en 5 segundos.
                </p>
            </div>
        </div>
    );
};

export default PaymentCancel;
