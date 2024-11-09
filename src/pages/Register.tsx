import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../types/mainTypes';
import { useState } from 'react';
import { redirectToCheckout } from '../api/stripe';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import FormContainer from '../components/layouts/FormContainer';
import { Input } from '../components/common/Input';
import CustomCheckbox from '../components/common/CustomCheckbox';
import { ProductCard } from '../components/widgets/ProductCard';
import { passwordValidation } from '../utils/passwordValidation';
import { StepDisplay } from '../components/widgets/StepDisplay';

const Register = () => {
    const { showToast } = useAppContext();
    const methods = useForm<RegisterFormData>();

    const [step, setStep] = useState(1);
    const { watch } = methods;
    const priceAmount = 99;

    const mutation = useMutation(apiClient.createCheckoutSession, {
        onSuccess: async (sessionId) => {
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
        <>
            <StepDisplay total={3} current={step} />
            <FormProvider {...methods}>
                <form noValidate onSubmit={onSubmit}>
                    <FormContainer step={step} price={priceAmount}>
                        <div
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

                                    <button
                                        type="submit"
                                        className="btn-submit"
                                    >
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
                                        notRequired
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
                                            name="zipCode"
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
                        </div>
                    </FormContainer>
                </form>
            </FormProvider>
        </>
    );
};

export default Register;
