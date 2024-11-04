import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../types/mainTypes';
import { useState } from 'react';
import { redirectToCheckout } from '../api/stripe';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Input } from '../components/Input';
import CustomCheckbox from '../components/CustomCheckbox';
import { ProductCard } from '../components/ProductCard';
import { passwordValidation } from '../utils/passwordValidation';

const Register = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const methods = useForm<RegisterFormData>();

    const [step, setStep] = useState(1);
    const { watch } = methods;
    const priceAmount = 99;

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
        } else {
            await mutation.mutate(priceAmount);
        }
    });

    function passwordCheck(value: string): string | boolean {
        throw new Error('Function not implemented.');
    }

    return (
        <FormProvider {...methods}>
            <FormContainer step={step} price={priceAmount}>
                <form
                    noValidate
                    onSubmit={onSubmit}
                    className={`form ${step === 1 ? 'form-right' : 'form-left'}`}
                >
                    {step === 1 && (
                        <>
                            <h2>Detalles personales</h2>

                            <label className="form-label">
                                ¿Ya has comprado tu Breeze?
                                <br />
                                <Link to="/login">Inicia sesión</Link>
                            </label>

                            <Input
                                name="name"
                                type="text"
                                validate={(value) =>
                                    /^[A-Za-z\s-]+$/.test(value) ||
                                    'Solo se permiten letras y espacios'
                                }
                            >
                                Nombre
                            </Input>

                            <Input
                                name="surnames"
                                type="text"
                                validate={(value) =>
                                    /^[A-Za-z\s-]+$/.test(value) ||
                                    'Solo se permiten letras y espacios'
                                }
                            >
                                Apellidos
                            </Input>

                            <Input
                                name="email"
                                type="email"
                                validate={(value) =>
                                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                                        value
                                    ) || 'Introduce un email válido'
                                }
                            >
                                Email
                            </Input>

                            <Input
                                name="password"
                                type="password"
                                validate={(value) => {
                                    const validationResult =
                                        passwordValidation(value);
                                    return validationResult === true
                                        ? true
                                        : validationResult;
                                }}
                            >
                                Contraseña
                            </Input>

                            <Input
                                name="confirmPassword"
                                type="password"
                                confirmPassword
                            >
                                Verifica Contraseña
                            </Input>

                            <div className="mt-8">
                                <CustomCheckbox />
                            </div>

                            <button type="submit" className="btn-submit">
                                Siguiente
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h2>Detalles de envío</h2>

                            <Input
                                name="address"
                                type="text"
                                customClass="w-full"
                            >
                                Dirección
                            </Input>
                            <Input
                                name="buildingDetails"
                                type="text"
                                customClass="w-full"
                            >
                                Edificio, portal, etc.
                            </Input>
                            <div className="flex inline-flex justify-between">
                                <Input
                                    name="country"
                                    type="text"
                                    customClass="w-full"
                                >
                                    País
                                </Input>
                                <Input
                                    name="city"
                                    type="text"
                                    customClass="w-full"
                                >
                                    Ciudad
                                </Input>
                            </div>
                            <div className="flex inline-flex justify-between">
                                <Input
                                    name="postalCode"
                                    type="number"
                                    customClass="w-full"
                                >
                                    Código postal
                                </Input>
                                <Input
                                    name="phone"
                                    type="tel"
                                    customClass="w-full"
                                >
                                    Teléfono
                                </Input>
                            </div>

                            <ProductCard price={priceAmount} />
                        </>
                    )}
                </form>
            </FormContainer>
        </FormProvider>

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
