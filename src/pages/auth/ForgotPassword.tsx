import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import { useMutation } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { ToastMessageType } from '../../types/mainTypes';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { passwordValidation } from '../../utils/passwordValidation';

function ForgotPassword() {
    const { showToast } = useAppContext();
    const emailMethods = useForm(); // Separate useForm for email form
    const codeMethods = useForm(); // Separate useForm for verification code form
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const email = emailMethods.watch('email');

    // Mutación para enviar el correo y recibir el código
    const forgotPasswordEmailMutation = useMutation(
        apiClient.forgotPasswordEmail,
        {
            onSuccess: () => {
                showToast({
                    message:
                        'Si el correo está afiliado a un usuario, recibirás un código de verificación',
                    type: ToastMessageType.SUCCESS,
                });
            },
            onError: (error) => {
                showToast({
                    message: (error as any).message,
                    type: ToastMessageType.ERROR,
                });
            },
        }
    );

    // Mutación para verificar el código recibido
    const forgotPasswordTokenMutation = useMutation(
        apiClient.forgotPasswordToken,
        {
            onSuccess: () => {
                showToast({
                    message: 'Código verificado correctamente',
                    type: ToastMessageType.SUCCESS,
                });
                setStep(2); // Ir al segundo paso
            },
            onError: (error) => {
                showToast({
                    message: (error as any).message,
                    type: ToastMessageType.ERROR,
                });
            },
        }
    );

    // Mutación para cambiar la contraseña
    const resetPasswordMutation = useMutation(apiClient.resetPassword, {
        onSuccess: () => {
            showToast({
                message: 'Contraseña cambiada con éxito',
                type: ToastMessageType.SUCCESS,
            });
            navigate(routes.AUTH.LOGIN);
        },
        onError: (error) => {
            showToast({
                message: (error as any).message,
                type: ToastMessageType.ERROR,
            });
        },
    });

    // Handlers para los formularios
    const onReceiveCodeSubmit = emailMethods.handleSubmit(async (data) => {
        await forgotPasswordEmailMutation.mutate(data.email);
    });

    const onVerifyCodeSubmit = codeMethods.handleSubmit(async (data) => {
        await forgotPasswordTokenMutation.mutate({
            email: email,
            code: data.verificationCode,
        });
    });

    const onResetPasswordSubmit = codeMethods.handleSubmit(async (data) => {
        await resetPasswordMutation.mutate(data.newPassword);
    });

    return (
        <div className="mx-auto max-w-md rounded-xl border-[1px] border-gray bg-white p-10 shadow-sm">
            <h3 className="mb-6 text-[32px] font-normal">Cambiar contraseña</h3>

            {step === 1 ? (
                <>
                    <p className="mb-4 text-base">
                        Escribe tu correo electrónico para recibir un código y
                        poder cambiar tu contraseña
                    </p>

                    {/* Formulario para enviar email */}
                    <FormProvider {...emailMethods}>
                        <form noValidate onSubmit={onReceiveCodeSubmit}>
                            <Input
                                name="email"
                                type="email"
                                validate={(value) =>
                                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                                        value
                                    ) || 'Introduce un email válido'
                                }
                                customClass="!mb-6 w-full"
                            >
                                Correo electrónico
                            </Input>

                            <button
                                type="submit"
                                className="btn-primary mx-auto mb-6 w-full text-base font-normal"
                                disabled={forgotPasswordEmailMutation.isLoading}
                            >
                                {forgotPasswordEmailMutation.isLoading
                                    ? 'Enviando...'
                                    : 'Recibir código'}
                            </button>
                        </form>
                    </FormProvider>

                    {/* Formulario para verificar código */}
                    <FormProvider {...codeMethods}>
                        <form noValidate onSubmit={onVerifyCodeSubmit}>
                            <Input
                                name="verificationCode"
                                type="number"
                                customClass="!mb-6 w-full"
                                validate={(value) =>
                                    /^\d{6}$/.test(value) ||
                                    'El código debe ser un número de 6 dígitos'
                                }
                            >
                                Código de verificación
                            </Input>

                            <button
                                type="submit"
                                className="btn-primary w-full text-base font-normal disabled:bg-gray disabled:text-offblack"
                                disabled={
                                    !/^\d{6}$/.test(
                                        codeMethods.watch('verificationCode')
                                    ) || forgotPasswordTokenMutation.isLoading
                                }
                            >
                                {forgotPasswordTokenMutation.isLoading
                                    ? 'Verificando...'
                                    : 'Verificar código'}
                            </button>
                        </form>
                    </FormProvider>
                </>
            ) : (
                <>
                    <p className="text-lg">Escribe tu nueva contraseña</p>

                    <p className="mb-4 text-[0.9rem] leading-[1.5rem] text-neutral-400">
                        Al menos 8 caracteres, incluidas letras mayúsculas y
                        minúsculas, números y caracteres especiales.
                    </p>

                    <FormProvider {...codeMethods}>
                        <form noValidate onSubmit={onResetPasswordSubmit}>
                            <Input
                                name="newPassword"
                                type="password"
                                customClass="w-full"
                                validate={(value) => {
                                    const validationResult =
                                        passwordValidation(value);
                                    return validationResult === true
                                        ? true
                                        : validationResult;
                                }}
                            >
                                Contraseña nueva
                            </Input>

                            <Input
                                name="verifyNewPassword"
                                type="password"
                                customClass="w-full mb-8"
                                validate={(value) =>
                                    value ===
                                        codeMethods.watch('newPassword') ||
                                    'Las contraseñas no coinciden'
                                }
                            >
                                Verifica la nueva contraseña
                            </Input>

                            <button
                                type="submit"
                                className="btn-primary mx-auto mt-2 w-full text-base font-normal"
                                disabled={resetPasswordMutation.isLoading}
                            >
                                {resetPasswordMutation.isLoading
                                    ? 'Confirmando...'
                                    : 'Confirmar cambio de contraseña'}
                            </button>
                        </form>
                    </FormProvider>
                </>
            )}
        </div>
    );
}

export default ForgotPassword;
