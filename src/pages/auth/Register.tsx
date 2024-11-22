import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { RegisterFormData, ToastMessageType } from '../../types/mainTypes';
import { useState } from 'react';
import { redirectToCheckout } from '../../api/stripe';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/layouts/FormContainer';
import { Input } from '../../components/common/Input';
import CustomCheckbox from '../../components/common/CustomCheckbox';
import { ProductCard } from '../../components/widgets/ProductCard';
import { passwordValidation } from '../../utils/passwordValidation';
import { StepDisplay } from '../../components/widgets/StepDisplay';
import { validatePostalCode } from '../../utils/PostalCodeValidation';
import PhoneInput from '../../components/common/PhoneInput';
import { routes } from '../../routes/routes';
import { Payment, Shipping, Details } from '../../components/icons/index';

const Register = () => {
    const { showToast } = useAppContext();
    const methods = useForm<RegisterFormData>({
        defaultValues: {
            city: 'Valencia',
            country: 'España',
        },
    });

    const [step, setStep] = useState(1);
    const { watch } = methods;
    const priceAmount = 104;

    const [verifyEmailButtonState, setVerifyEmailButtonState] = useState<
        'initial' | 'sent' | 'sending'
    >('initial');

    // Button text and disabling logic based on verifyEmailButtonState
    const buttonText =
        verifyEmailButtonState === 'sending'
            ? 'Enviando...'
            : verifyEmailButtonState === 'sent'
              ? 'Verificación enviada'
              : 'Verificar email';
    const buttonDisabled =
        verifyEmailButtonState === 'sending' ||
        verifyEmailButtonState === 'sent';

    // Mutation for sending confirmation email
    const sendConfirmationEmailMutation = useMutation(
        apiClient.sendConfirmationEmail,
        {
            onSuccess: () => {
                showToast({
                    message:
                        'Correo de verificación enviado, comprueba tu correo',
                    type: ToastMessageType.SUCCESS,
                });
                setVerifyEmailButtonState('sent');
            },
            onError: (error: Error) => {
                showToast({
                    message: error.message,
                    type: ToastMessageType.ERROR,
                });
                setVerifyEmailButtonState('initial');
            },
        }
    );

    const handleConfirmationEmail = () => {
        // Get the email value from the form using watch()
        const email = watch('email');

        if (email) {
            setVerifyEmailButtonState('sending');
            sendConfirmationEmailMutation.mutate(email);
        } else {
            showToast({
                message: 'Por favor, ingresa el Email',
                type: ToastMessageType.ERROR,
            });
        }
    };

    const validateEmailConfirmationTokenMutation = useMutation(
        apiClient.validateEmailConfirmationToken,
        {
            onSuccess: () => {
                scrollToTop();
                setStep(2);
            },
            onError: (error: Error) => {
                showToast({
                    message: error.message,
                    type: ToastMessageType.ERROR,
                });
            },
        }
    );

    const createCheckoutSessionMutation = useMutation(
        apiClient.createCheckoutSession,
        {
            onSuccess: async (sessionId) => {
                localStorage.setItem('userData', JSON.stringify(watch()));
                await redirectToCheckout(sessionId);
            },
            onError: (error: Error) => {
                showToast({
                    message: error.message,
                    type: ToastMessageType.ERROR,
                });
            },
        }
    );

    const onSubmit = methods.handleSubmit(async () => {
        if (step === 1) {
            //Email is ensured to be valid by the previous form validation rules
            const email = watch('email');

            validateEmailConfirmationTokenMutation.mutate(email);
        } else {
            await createCheckoutSessionMutation.mutate(priceAmount);
        }
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <StepDisplay
                total={3}
                current={step}
                steps={[Details, Shipping, Payment]}
            />
            <FormProvider {...methods}>
                <form noValidate onSubmit={onSubmit}>
                    <FormContainer step={step} price={priceAmount}>
                        <div
                            className={`form ${step === 1 ? 'rounded-br-lg rounded-tr-lg' : 'rounded-bl-lg rounded-tl-lg'}`}
                        >
                            {step === 1 && (
                                <>
                                    <h2>Detalles personales</h2>

                                    <label className="form-label mb-6">
                                        ¿Ya has comprado tu Breeze?
                                        <br />
                                        <Link to={routes.AUTH.LOGIN}>
                                            Inicia sesión
                                        </Link>
                                    </label>

                                    <Input
                                        name="name"
                                        type="text"
                                        validate={(value) =>
                                            /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ-]+$/.test(
                                                value
                                            ) ||
                                            'Solo se permiten letras, espacios y tildes'
                                        }
                                    >
                                        Nombre
                                    </Input>

                                    <Input
                                        name="surnames"
                                        type="text"
                                        validate={(value) =>
                                            /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ-]+$/.test(
                                                value
                                            ) ||
                                            'Solo se permiten letras y espacios'
                                        }
                                    >
                                        Apellidos
                                    </Input>

                                    <div className="grid grid-cols-2 gap-x-4">
                                        <Input
                                            name="email"
                                            type="email"
                                            customClass="w-full"
                                            validate={(value) =>
                                                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                                                    value
                                                ) || 'Introduce un email válido'
                                            }
                                        >
                                            Email
                                        </Input>
                                        <button
                                            type="button"
                                            className={`btn-primary mb-6 mt-2 w-8/12 px-2 py-2.5 text-sm font-normal disabled:bg-gray disabled:text-offblack`}
                                            onClick={handleConfirmationEmail}
                                            disabled={buttonDisabled}
                                        >
                                            {buttonText}
                                        </button>
                                    </div>

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
                                        customClass="!mb-0"
                                    >
                                        Contraseña
                                    </Input>
                                    <p className="my-2 w-10/12 text-sm leading-tight text-neutral-400">
                                        Al menos 8 caracteres, incluidas letras
                                        mayúsculas y minúsculas, números y
                                        caracteres especiales.
                                    </p>

                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        confirmPassword
                                    >
                                        Verifica Contraseña
                                    </Input>

                                    <div>
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
                                    <h2 className="pb-8">Detalles de envío</h2>

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
                                    <div className="inline-flex justify-between gap-4">
                                        <Input
                                            name="country"
                                            type="text"
                                            customClass="w-full"
                                            readOnly
                                        >
                                            País
                                        </Input>
                                        <Input
                                            name="city"
                                            type="text"
                                            customClass="w-full"
                                            readOnly
                                        >
                                            Ciudad
                                        </Input>
                                    </div>

                                    <div className="grid grid-flow-row grid-cols-2 grid-rows-1 gap-4">
                                        <Input
                                            name="zipCode"
                                            type="number"
                                            customClass="w-full"
                                            validate={validatePostalCode}
                                        >
                                            Código postal
                                        </Input>

                                        <PhoneInput name="phone">
                                            Teléfono
                                        </PhoneInput>
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
