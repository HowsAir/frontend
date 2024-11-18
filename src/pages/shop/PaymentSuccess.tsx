import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../../types/mainTypes';
import { useAppContext } from '../../contexts/AppContext';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const registrationAttempted = useRef(false);

    // Estado para mensajes de error
    const [errorMessage, setErrorMessage] = useState<string | null>(
        'No hay pago realizado, acción denegada'
    );

    // Mutation para el registro
    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            console.log('Registro completado con éxito');
            queryClient.invalidateQueries('validateToken');
            showToast({
                message:
                    'Tu compra ha sido realizada con exito, comprueba tu correo',
                type: ToastMessageType.SUCCESS,
            });
            localStorage.removeItem('userData');
            navigate('/');
        },
        onError: (error: Error) => {
            localStorage.removeItem('userData');
            showToast({
                message: error.message,
                type: ToastMessageType.ERROR,
            });
            setErrorMessage(error.message);
        },
    });

    // Ejecutar registro solo una vez al montar
    useEffect(() => {
        const handleRegistration = () => {
            // Si ya se intentó el registro, no hacer nada
            if (registrationAttempted.current) {
                console.log('Registration already attempted, skipping');
                return;
            }

            const userData = localStorage.getItem('userData');

            if (!userData) {
                console.log('No userData found, showing error message');
                return;
            }

            const parsedData: RegisterFormData = JSON.parse(userData);
            console.log('Starting registration process');
            setErrorMessage(null);
            registrationAttempted.current = true;
            mutation.mutate(parsedData);
        };

        handleRegistration();
    }, []);

    // Efecto para redirección en caso de error
    useEffect(() => {
        if (errorMessage) {
            console.log(
                'Error encontrado, redirigiendo a /breeze en 5 segundos'
            );
            const timer = setTimeout(() => {
                navigate('/breeze');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, navigate]);

    return (
        <div className="bg-gray-100 flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                {errorMessage ? (
                    <div className="mb-4 text-lg text-red-600">
                        {errorMessage}
                    </div>
                ) : (
                    <>
                        <h2>Estamos procesando tu pago...</h2>
                        <p>Esto puede tardar un poco</p>
                        <div className="loader mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
