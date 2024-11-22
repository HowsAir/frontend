import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../components/common/Input';
import {
    ChangePasswordFormData,
    ToastMessageType,
} from '../../types/mainTypes';
import { useMutation } from 'react-query';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api/apiClient';
import { passwordValidation } from '../../utils/passwordValidation';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';

const ChangePassword = () => {
    const methods = useForm<ChangePasswordFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const changePasswordMutation = useMutation(apiClient.changePassword, {
        onSuccess: () => {
            showToast({
                message: 'Contraseña cambiada exitosamente. Cerrando sesión...',
                type: ToastMessageType.SUCCESS,
            });
            methods.reset();
            setTimeout(() => {
                apiClient.logout();
                navigate(routes.AUTH.LOGIN);
            }, 2000);
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
        const requestData = {
            currentPassword: data.password,
            newPassword: data.newPassword,
        };
        changePasswordMutation.mutate(requestData);
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
                    <Input name="password" type="password" customClass="w-full !mb-2">
                        Contraseña actual
                    </Input>
                    <Link
                        to={routes.AUTH.FORGOT_PASSWORD}
                        className="text-neutral-400 underline"
                    >
                        Olvidé mi contraseña
                    </Link>

                    <p className="text-lg mt-4">Escribe tu nueva contraseña</p>

                    <p className="text-sm leading-tight mb-2 text-neutral-400">
                        Al menos 8 caracteres, incluidas letras mayúsculas y
                        minúsculas, números y caracteres especiales.
                    </p>

                    <Input
                        name="newPassword"
                        type="password"
                        customClass="!mb-2 w-full"
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
                        className="btn-primary w-full py-2 text-lg"
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
