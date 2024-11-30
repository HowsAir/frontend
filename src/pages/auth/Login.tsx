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
import { useUser } from '../../contexts/UserContext';

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

    const { refreshUser } = useUser(); // Import this from UserContext

    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            try {
                // After successful login, fetch and set user profile
                await refreshUser();
                await validateAuth();

                showToast({
                    message: 'Sesión iniciada',
                    type: ToastMessageType.SUCCESS,
                });

                // Navigate based on role
                const { roleId } = await apiClient.validateToken();
                console.log(roleId);
                switch (roleId) {
                    case 1: // User
                        console.log('redirecting to user index');
                        navigate(routes.USER.INDEX);
                        break;
                    case 2: // Admin
                        console.log('redirecting to admin index');
                        navigate(routes.ADMIN.INDEX);
                        break;
                    default:
                        navigate(from); // Default to "from" path or home
                        break;
                }

                queryClient.invalidateQueries('user'); // Optional: Revalidate other user-related queries
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
                    <div className="flex w-10/12 w-full flex-col">
                        <h2>Bienvenido</h2>

                        <label className="form-label mb-4">
                            ¿Aún no has comprado tu Breeze?
                            <br />
                            <Link to={routes.SHOP.PRODUCT}>Cómpralo aquí</Link>
                        </label>

                        <Input
                            name="email"
                            type="email"
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
                            customClass="!mb-4"
                        >
                            Contraseña
                        </Input>

                        <Link
                            to={routes.AUTH.FORGOT_PASSWORD}
                            className="w-fit text-neutral-400 underline"
                        >
                            Olvidé mi contraseña
                        </Link>
                        <button
                            className="btn-submit mr-36"
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
