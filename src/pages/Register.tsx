import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../types/mainTypes';
import { useState } from 'react';
import { redirectToCheckout } from '../api/stripe';
import { useAppContext } from '../contexts/AppContext';
import { passwordValidation } from '../utils/passwordValidation';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Input } from '../components/Input';
import CustomCheckbox from '../components/CustomCheckbox';

const Register = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const methods = useForm<RegisterFormData>();

    const [step, setStep] = useState(1);
    const { watch } = methods;
    const priceAmount = 85;

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

    const onSubmit = methods.handleSubmit(async () => {
        if (step === 1) {
            setStep(2);
            return true;
        } else {
            await mutation.mutate(priceAmount);
        }
    });

    return (
        <FormContainer
            onSubmitSuccess={() => {
                setStep(2);
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={onSubmit} className="form">
                    {step === 1 && (
                        <>
                            <h2>Detalles personales</h2>

                            <label className="form-label">
                                ¿Ya has comprado tu Breeze?
                                <br />
                                <Link to="/login">Inicia sesión</Link>
                            </label>

                            <Input name="name" type="text">
                                Nombre{' '}
                            </Input>

                            <Input name="surnames" type="text">
                                Apellidos{' '}
                            </Input>

                            <Input name="email" type="email">
                                Email{' '}
                            </Input>

                            <Input name="password" type="password">
                                Contraseña{' '}
                            </Input>

                            <Input
                                name="confirmPassword"
                                type="password"
                                confirmPassword
                            >
                                Verifica Contraseña{' '}
                            </Input>

                            <CustomCheckbox />

                            <button type="submit" className="btn-submit">
                                Siguiente
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h2>Tamo activo papi</h2>
                        </>
                    )}
                </form>
            </FormProvider>
        </FormContainer>

        //     <div className="flex min-h-screen">
        //         {/* Sección izquierda */}
        //         <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-10">
        //             <h1 className="text-4xl font-bold mb-4">HowsAir</h1>
        //             <p className="text-lg mb-10">
        //                 Conoce la calidad del aire a tu alrededor en un santiamén!
        //             </p>
        //             <footer className="text-sm mt-auto">
        //                 &copy; 2024 HowsAir. Todos los derechos reservados.
        //             </footer>
        //         </div>

        //         {/* Sección derecha */}
        //         <div className="w-1/2 flex flex-col justify-center items-center p-10">
        //             <form className="w-full max-w-md" onSubmit={onSubmit}>
        //                 {step === 1 ? (
        //                     <>
        //                         <h2 className="text-3xl font-bold mb-6">
        //                             Detalles personales
        //                         </h2>
        //                         <p className="text-sm mb-6">
        //                             ¿Ya has comprado tu Breeze?{' '}
        //                             <Link to="/login" className="text-primary font-semibold">
        //                                 Inicia sesión aquí
        //                             </Link>
        //                         </p>

        //                         <div className="space-y-4">
        //

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Apellidos"
        //                                 {...register('surnames', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.surnames && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.surnames.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Email"
        //                                 type="email"
        //                                 {...register('email', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.email && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.email.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Contraseña"
        //                                 type="password"
        //                                 {...register('password', {
        //                                     required: 'Este campo es obligatorio',
        //                                     validate: {
        //                                         passwordCheck: (value) => {
        //                                             const validationResult = passwordValidation(value);
        //                                             return validationResult === true ? true : validationResult;
        //                                         }
        //                                     }
        //                                 })}
        //                             />
        //                             {errors.password && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.password.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Verifica Contraseña"
        //                                 type="password"
        //                                 {...register('confirmPassword', {
        //                                     required: 'Este campo es obligatorio',
        //                                     validate: (val: string) =>
        //                                         val === watch('password') ||
        //                                         'Las contraseñas no coinciden',
        //                                 })}
        //                             />
        //                             {errors.confirmPassword && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.confirmPassword.message}
        //                                 </span>
        //                             )}
        //                         </div>

        //                         <div className="flex items-start mt-4">
        //                             <input
        //                                 type="checkbox"
        //                                 className="h-5 w-5 text-primary rounded border-gray-300"
        //                                 {...register('terms', {
        //                                     required: 'Debes aceptar los términos',
        //                                 })}
        //                             />
        //                            <label className="ml-2 text-sm text-gray-700">
        //                                 Acepto los{' '}
        //                                 <Link
        //                                 to="/terms-and-privacy"
        //                                 target="_blank"
        //                                 rel="noopener noreferrer"
        //                                 className="text-primary font-semibold">
        //                                     términos, condiciones y privacidad
        //                                 </Link>
        //                             </label>
        //                         </div>
        //                         {errors.terms && (
        //                             <span className="text-red-500 text-sm">
        //                                 {errors.terms.message}
        //                             </span>
        //                         )}

        //                         <button
        //                             type="submit"
        //                             className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
        //                         >
        //                             Siguiente
        //                         </button>
        //                     </>
        //                 ) : (
        //                     <>
        //                         <h2 className="text-3xl font-bold mb-6">
        //                             Información de dirección
        //                         </h2>

        //                         <div className="space-y-4">
        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Teléfono"
        //                                 type="tel"
        //                                 {...register('phone', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.phone && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.phone.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="País"
        //                                 {...register('country', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.country && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.country.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Código Postal"
        //                                 {...register('postalCode', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.postalCode && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.postalCode.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Ciudad"
        //                                 {...register('city', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.city && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.city.message}
        //                                 </span>
        //                             )}

        //                             <input
        //                                 className="w-full border rounded-lg p-3"
        //                                 placeholder="Dirección"
        //                                 {...register('address', {
        //                                     required: 'Este campo es obligatorio',
        //                                 })}
        //                             />
        //                             {errors.address && (
        //                                 <span className="text-red-500 text-sm">
        //                                     {errors.address.message}
        //                                 </span>
        //                             )}
        //                         </div>

        //                         <button
        //                             type="submit"
        //                             className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-semibold hover:bg-blue-500"
        //                         >
        //                             Ir al pago
        //                         </button>
        //                     </>
        //                 )}
        //             </form>
        //         </div>
        //     </div>
    );
};

export default Register;
