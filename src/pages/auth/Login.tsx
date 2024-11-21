import { useAppContext } from '../../contexts/AppContext';

import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { LogInFormData, ToastMessageType } from '../../types/mainTypes';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../components/common/Input';
import FormContainer from '../../components/layouts/FormContainer';
import { routes } from '../../routes/routes';

const Login: React.FC = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const methods = useForm<LogInFormData>();
    const { handleSubmit } = methods;

    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation(apiClient.login, {
        onSuccess: () => {
            showToast({
                message: 'Sesión iniciada',
                type: ToastMessageType.SUCCESS,
            });
            queryClient.invalidateQueries('validateToken');
            navigate(routes.HOME.INDEX);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                'Ocurrió un error. Intentalo de nuevo.';
            showToast({ message: errorMessage, type: ToastMessageType.ERROR });
            setIsLoading(false); // Ensure loading state is reset
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
                    <div className="w-10/12 flex flex-col">
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
                            customClass="w-full !mb-2"
                        >
                            Contraseña
                        </Input>

                        <Link
                            to="/forgot-password"
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
