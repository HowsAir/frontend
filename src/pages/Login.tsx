import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';
import { useAppContext } from '../contexts/AppContext';
import { LogInFormData, ToastMessageType } from '../types/mainTypes';


import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const { register, handleSubmit, formState: { errors } } = useForm<LogInFormData>();
    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation(apiClient.login, {
        onSuccess: () => {
            showToast({ message: 'Has iniciado la sesión correctamente', type: ToastMessageType.SUCCESS });
            queryClient.invalidateQueries('user');
            navigate('/');
        },
        onError: (error: any) => {
            showToast({ message: error.message, type: ToastMessageType.ERROR });
        }
    });

const onSubmit = handleSubmit((data: LogInFormData) => {
    setIsLoading(true);
    mutation.mutate(data, {
        onSettled: () => {
            setIsLoading(false);
        }
    });
});

    return (
        <div className="flex min-h-screen">
            {/* Sección izquierda */}
            <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-10">
                <h1 className="text-4xl font-bold mb-4">HowsAir</h1>
                <p className="text-lg mb-10">
                    Conoce la calidad del aire a tu alrededor en un santiamén!
                </p>
                <footer className="text-sm mt-auto">
                    &copy; 2024 HowsAir. Todos los derechos reservados.
                </footer>
            </div>

            {/* Sección derecha */}
            <div className="w-1/2 flex flex-col justify-center items-center p-10">
                <form className="w-full max-w-md" onSubmit={onSubmit}>
                    <h2 className="text-3xl font-bold mb-6">Inicia sesión</h2>
                    <p className="text-sm mb-6">
                        ¿Aún no has comprado tu Breeze?{' '}
                        <Link to="/register" className="text-primary font-semibold">
                            Cómpralo aquí
                        </Link>
                    </p>
                    <div className="space-y-4">
                        {/* Input email */}
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Email"
                            type="email"
                            {...register('email', {
                                required: 'Este campo es obligatorio',
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}

                        {/* Input contrasenya  */}
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Contraseña"
                            type="password"
                            {...register('password', {
                                required: 'Este campo es obligatorio',
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Boton submit */}
                    <button
                        className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>

                    {/* Enlace a Olvidé mi contraseña */}
                    <p className="text-sm mt-6">
                        <Link
                            to="/forgot-password"
                            className="text-primary font-semibold underline"
                        >
                            ¿Has olvidado tu contraseña?
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;