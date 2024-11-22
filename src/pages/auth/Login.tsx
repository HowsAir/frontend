import { useAppContext } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { LogInFormData, ToastMessageType } from '../../types/mainTypes';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Input } from '../../components/common/Input';
import FormContainer from '../../components/layouts/FormContainer';
import { routes } from '../../routes/routes';

const Login: React.FC = () => {
    const { showToast } = useAppContext();
    const { validateAuth } = useAuth(); // We'll use validateAuth instead of individual login/roleId
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the redirect path from location state, or default to home
    const from = (location.state as any)?.from?.pathname || routes.HOME.INDEX;

    const methods = useForm<LogInFormData>();
    const { handleSubmit } = methods;

    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            try {
                // After successful login, validate auth which will update the context
                await validateAuth();

                showToast({
                    message: 'Sesión iniciada',
                    type: ToastMessageType.SUCCESS,
                });

                // Navigate based on role - the role will be available in the auth context
                const { roleId } = await apiClient.validateToken();
                switch (roleId) {
                    case 2: // Admin
                        navigate(routes.ADMIN.INDEX);
                        break;
                    case 1: // User
                        navigate(routes.USER.INDEX);
                        break;
                    default:
                        // If we have a 'from' location, go there, otherwise go home
                        navigate(from);
                        break;
                }

                // Invalidate any relevant queries
                queryClient.invalidateQueries('user');
            } catch (error) {
                showToast({
                    message: 'Error al validar la sesión',
                    type: ToastMessageType.ERROR,
                });
            }
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                'Ocurrió un error. Intentalo de nuevo.';
            showToast({ message: errorMessage, type: ToastMessageType.ERROR });
            setIsLoading(false);
        },
    });

    const onSubmit = handleSubmit((data: LogInFormData) => {
        setIsLoading(true);
        mutation.mutate(data, {
            onSettled: () => {
                setIsLoading(false);
            },
        });
    });

    return (
        <FormContainer step={1}>
            <FormProvider {...methods}>
                <form
                    onSubmit={onSubmit}
                    className="form rounded-br-lg rounded-tr-lg"
                >
                    <div className="flex w-10/12 flex-col">
                        <h2>Bienvenido</h2>

                        <label className="form-label mb-4">
                            ¿Aún no has comprado tu Breeze?
                            <br />
                            <Link to={routes.SHOP.PRODUCT}>Cómpralo aquí</Link>
                        </label>

                        <Input
                            name="email"
                            type="email"
                            customClass="w-full"
                            validate={(value) =>
                                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                                'Introduce un email válido'
                            }
                        >
                            Email
                        </Input>

                        <Input
                            name="password"
                            type="password"
                            customClass="w-full !mb-4"
                        >
                            Contraseña
                        </Input>

                        <Link
                            to={routes.AUTH.FORGOT_PASSWORD}
                            className="text-neutral-400 underline"
                        >
                            Olvidé mi contraseña
                        </Link>
                        <button
                            className="btn-submit"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? 'Iniciando sesión...'
                                : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </FormContainer>
    );
};

export default Login;
