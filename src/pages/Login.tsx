import { useAppContext } from '../contexts/AppContext';

import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';

import { LogInFormData, ToastMessageType } from '../types/mainTypes';
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInFormData>();
    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation(apiClient.login, {
        onSuccess: () => {
            showToast({
                message: 'Has iniciado la sesión correctamente',
                type: ToastMessageType.SUCCESS,
            });
            queryClient.invalidateQueries('user');
            navigate('/');
        },
        onError: (error: any) => {
            console.error('Login error:', error); // Log the error for debugging
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                'Ocurrió un error. Intenta de nuevo.';
            showToast({ message: errorMessage, type: ToastMessageType.ERROR });
            setIsLoading(false); // Ensure loading state is reset
        },
    });


    const onSubmit = handleSubmit((data: LogInFormData) => {
        setIsLoading(true);
        mutation.mutate(data, {
            onSettled: () => {
                setIsLoading(false);
            },
        });
    });

    return (
        <div className="w-fit h-fit min-h-[70dvh] flex flex-row mx-auto">
            <div className="w-[35dvw] bg-form bg-cover sm:hidden lg:flex flex-col justify-between rounded-bl-lg rounded-tl-lg p-8 ">
                <div>
                    <h1>HowsAir</h1>
                    <h3 className="text-offwhite w-72">
                        Conoce la calidad del aire que respiras en segundos
                    </h3>
                </div>
                <span className="text-sm text-offwhite">
                    Copyright 2024 HowsAir. Todos los derechos reservados.
                </span>
            </div>
            <form onSubmit={onSubmit} className="form">
                <h2>Bienvenido</h2>

                <label className="form-label">
                    ¿Aún no has comprado tu Breeze?
                    <br />
                    <Link to="#">Cómpralo aquí</Link>
                </label>

                <input
                    className="form-input"
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

                <input
                    className="form-input"
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

                <Link to="#" className=" text- text-neutral-400 underline mt-2">
                    Olvidé mi contraseña
                </Link>
                <button
                    className="btn-submit"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>
    );
};

export default Login;
