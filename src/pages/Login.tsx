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
            showToast({ message: error.message, type: ToastMessageType.ERROR });
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
            <form
                onSubmit={onSubmit}
                className="lg:w-[35dvw] sm:w-[60dvw] flex flex-col bg-white sm:rounded-lg lg:rounded-none lg:rounded-br-lg 
            lg:rounded-tr-lg border-gray border-[1px] py-12 px-16"
            >
                <h2 className="mb-3">Bienvenido</h2>

                <label className="text-neutral-600">
                    ¿Aún no has comprado tu Breeze?
                    <br />
                    <Link to="#" className="text-neutral-400 underline">
                        Cómpralo aquí
                    </Link>
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
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary font-normal py-2 mt-12 sm:mx-0 lg:mx-auto"
                >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>
        </div>

        // <div className="flex min-h-screen">
        //     {/* Sección izquierda */}
        //     <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-10">
        //         <h1 className="text-4xl font-bold mb-4">HowsAir</h1>
        //         <p className="text-lg mb-10">
        //             Conoce la calidad del aire a tu alrededor en un santiamén!
        //         </p>
        //         <footer className="text-sm mt-auto">
        //             &copy; 2024 HowsAir. Todos los derechos reservados.
        //         </footer>
        //     </div>

        //     {/* Sección derecha */}
        //     <div className="w-1/2 flex flex-col justify-center items-center p-10">
        //         <form className="w-full max-w-md" onSubmit={onSubmit}>
        //             <h2 className="text-3xl font-bold mb-6">Inicia sesión</h2>
        //             <p className="text-sm mb-6">
        //                 ¿Aún no has comprado tu Breeze?{' '}
        //                 <Link to="/register" className="text-primary font-semibold">
        //                     Cómpralo aquí
        //                 </Link>
        //             </p>
        //             <div className="space-y-4">
        //                 {/* Input email */}
        //                 <input
        //                     className="w-full border rounded-lg p-3"
        //                     placeholder="Email"
        //                     type="email"
        //                     {...register('email', {
        //                         required: 'Este campo es obligatorio',
        //                     })}
        //                 />
        //                 {errors.email && (
        //                     <span className="text-red-500 text-sm">
        //                         {errors.email.message}
        //                     </span>
        //                 )}

        //                 {/* Input contrasenya  */}
        //                 <input
        //                     className="w-full border rounded-lg p-3"
        //                     placeholder="Contraseña"
        //                     type="password"
        //                     {...register('password', {
        //                         required: 'Este campo es obligatorio',
        //                     })}
        //                 />
        //                 {errors.password && (
        //                     <span className="text-red-500 text-sm">
        //                         {errors.password.message}
        //                     </span>
        //                 )}
        //             </div>

        //             {/* Boton submit */}
        //             <button
        //                 className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
        //                 type="submit"
        //                 disabled={isLoading}
        //             >
        //                 {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        //             </button>

        //             {/* Enlace a Olvidé mi contraseña */}
        //             <p className="text-sm mt-6">
        //                 <Link
        //                     to="/forgot-password"
        //                     className="text-primary font-semibold underline"
        //                 >
        //                     ¿Has olvidado tu contraseña?
        //                 </Link>
        //             </p>
        //         </form>
        //     </div>
        // </div>
    );
};

export default Login;
