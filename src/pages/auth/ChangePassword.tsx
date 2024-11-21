import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import {
    ChangePasswordFormData,
    ToastMessageType,
} from '../../types/mainTypes';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api/apiClient';
import { passwordValidation } from '../../utils/passwordValidation';

const ChangePassword = () => {
    const methods = useForm<ChangePasswordFormData>();
    const { showToast } = useAppContext(); // Para mostrar mensajes de éxito o error
    const [step, setStep] = useState(1);

    // Mutación para cambiar la contraseña
    const changePasswordMutation = useMutation(apiClient.changePassword, {
        onSuccess: () => {
            showToast({
                message: 'Contraseña cambiada exitosamente',
                type: ToastMessageType.SUCCESS,
            });
            methods.reset();
            // logout
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                'Ocurrió un error al cambiar la contraseña.';
            showToast({
                message: errorMessage,
                type: ToastMessageType.ERROR,
            });
        },
    });

    const onSubmit = methods.handleSubmit((data) => {
        changePasswordMutation.mutate({
            currentPassword: data.password,
            newPassword: data.newPassword,
        });
    });

    return (
        <div className="mx-auto max-w-md rounded-xl border-[1px] border-gray bg-white p-10 shadow-sm">
            <h3 className="mb-12 text-[32px] font-normal">
                Cambiar contraseña
            </h3>
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <p className="text-lg">
                        Escribe tu contraseña actual para cambiarla
                    </p>
                    <Input
                        name="password"
                        type="password"
                        customClass="w-full"
                        validate={(value) =>
                            value.length >= 6 ||
                            'La contraseña debe tener al menos 6 caracteres'
                        }
                    >
                        Contraseña actual
                    </Input>

                    <p className="text-lg mt-8">Escribe tu nueva contraseña</p>

                    <p className="text-sm leading-tight text-neutral-400">
                        Al menos 8 caracteres, incluidas letras mayúsculas y
                        minúsculas, números y caracteres especiales.
                    </p>

                    <Input
                        name="newPassword"
                        type="password"
                        customClass="mb-2 w-full"
                        validate={(value) => {
                            const validationResult = passwordValidation(value);
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
                            value === methods.watch('newPassword') ||
                            'Las contraseñas no coinciden'
                        }
                    >
                        Verifica la nueva contraseña
                    </Input>

                    <button
                        type="submit"
                        className="btn-primary text-lg w-full py-2"
                        disabled={changePasswordMutation.isLoading}
                    >
                        {changePasswordMutation.isLoading
                            ? 'Cambiando contraseña...'
                            : 'Confirmar cambio de contraseña'}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default ChangePassword;
