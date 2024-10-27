import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../types/mainTypes';
import { useState } from 'react';
import { redirectToCheckout } from '../api/stripe';
import { useAppContext } from '../contexts/AppContext';

const Register = () => {
    const priceAmount = 85; // Price in euros

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const [step, setStep] = useState(1); // Estado para manejar los pasos del formulario
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    // Mutation for the createCheckoutSession API call
    // This mutation will create a new checkout session and redirect the user to the Stripe checkout page
    const mutation = useMutation(apiClient.createCheckoutSession, {
        onSuccess: async (sessionId) => {
            queryClient.invalidateQueries('validateToken');

            localStorage.setItem('userData', JSON.stringify(watch()));

            await redirectToCheckout(sessionId);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: ToastMessageType.ERROR });
        },
    });

    // Handle form submission
    const onSubmit = handleSubmit(async () => {
        if (step === 1) {
            setStep(2); // Move to the next step
        } else {
            await mutation.mutate(priceAmount);
        }
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
                    {step === 1 ? (
                        <>
                            <h2 className="text-3xl font-bold mb-6">
                                Detalles personales
                            </h2>
                            <p className="text-sm mb-6">
                                ¿Ya has comprado tu Breeze?{' '}
                                <a
                                    href="#"
                                    className="text-primary font-semibold"
                                >
                                    Inicia sesión aquí
                                </a>
                            </p>

                            <div className="space-y-4">
                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Nombre"
                                    {...register('name', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Apellidos"
                                    {...register('surnames', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.surnames && (
                                    <span className="text-red-500 text-sm">
                                        {errors.surnames.message}
                                    </span>
                                )}

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

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Contraseña"
                                    type="password"
                                    {...register('password', {
                                        required: 'Este campo es obligatorio',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'La contraseña debe tener al menos 6 caracteres',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Verifica Contraseña"
                                    type="password"
                                    {...register('confirmPassword', {
                                        validate: (val: string) =>
                                            val === watch('password') ||
                                            'Las contraseñas no coinciden',
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-start mt-4">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 text-primary rounded border-gray-300"
                                    {...register('terms', {
                                        required: 'Debes aceptar los términos',
                                    })}
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Acepto los{' '}
                                    <a
                                        href="#"
                                        className="text-primary font-semibold"
                                    >
                                        términos, condiciones y privacidad
                                    </a>
                                </label>
                            </div>
                            {errors.terms && (
                                <span className="text-red-500 text-sm">
                                    {errors.terms.message}
                                </span>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
                            >
                                Siguiente
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-6">
                                Información de dirección
                            </h2>

                            <div className="space-y-4">
                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Teléfono"
                                    type="tel"
                                    {...register('phone', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm">
                                        {errors.phone.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="País"
                                    {...register('country', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.country && (
                                    <span className="text-red-500 text-sm">
                                        {errors.country.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Código Postal"
                                    {...register('postalCode', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.postalCode && (
                                    <span className="text-red-500 text-sm">
                                        {errors.postalCode.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Ciudad"
                                    {...register('city', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.city && (
                                    <span className="text-red-500 text-sm">
                                        {errors.city.message}
                                    </span>
                                )}

                                <input
                                    className="w-full border rounded-lg p-3"
                                    placeholder="Dirección"
                                    {...register('address', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.address && (
                                    <span className="text-red-500 text-sm">
                                        {errors.address.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
                            >
                                Ir al pago
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
