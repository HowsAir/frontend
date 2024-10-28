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
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Pago Cancelado</h1>
                <p className="text-lg mb-4">
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
