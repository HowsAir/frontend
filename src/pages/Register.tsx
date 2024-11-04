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
        } else {
            await mutation.mutate(priceAmount);
        }
    });

    return (
        <FormContainer step={step}>
            <FormProvider {...methods}>
                <form
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

                            <Input name="name" type="text">
                                Nombre
                            </Input>

                            <Input name="surnames" type="text">
                                Apellidos
                            </Input>

                            <Input name="email" type="email">
                                Email
                            </Input>

                            <Input name="password" type="password">
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
                            <input
                                type="text"
                                className="form-input w-full"
                                placeholder="Edificio, portal, etc."
                            ></input>
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

                            <div></div>
                        </>
                    )}
                </form>
            </FormProvider>
        </FormContainer>

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
