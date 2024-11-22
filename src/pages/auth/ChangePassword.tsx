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
import { useAuth } from '../../contexts/AuthContext';

const ChangePassword = () => {
    const methods = useForm<ChangePasswordFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { validateAuth } = useAuth();

    const handleLogout = async () => {
        try {
            await apiClient.logout();
            await validateAuth();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const changePasswordMutation = useMutation(apiClient.changePassword, {
        onSuccess: () => {
            showToast({
                message: 'Contraseña cambiada exitosamente. Cerrando sesión...',
                type: ToastMessageType.SUCCESS,
            });
            methods.reset();
            setTimeout(() => {
                handleLogout();
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
            <h3 className="mb-6 text-[32px] font-normal">Cambiar contraseña</h3>
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <p className="text-lg">
                        Escribe tu contraseña actual para cambiarla
                    </p>
                    <Input
                        name="password"
                        type="password"
                        customClass="w-full !mb-4"
                    >
                        Contraseña actual
                    </Input>
                    <Link
                        to={routes.AUTH.FORGOT_PASSWORD}
                        className="text-neutral-400 underline"
                    >
                        Olvidé mi contraseña
                    </Link>

                    <p className="mt-4 text-lg">Escribe tu nueva contraseña</p>

                    <p className="my-2 text-sm leading-tight text-neutral-400">
                        Al menos 8 caracteres, incluidas letras mayúsculas y
                        minúsculas, números y caracteres especiales.
                    </p>

                    <Input
                        name="newPassword"
                        type="password"
                        customClass="!mb-4 w-full"
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
                        className="btn-primary w-full py-2 text-lg font-normal"
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