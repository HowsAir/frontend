import { useAppContext } from '../contexts/AppContext';

import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/apiClient';
import { LogInFormData, ToastMessageType } from '../types/mainTypes';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../components/common/Input';
import FormContainer from '../components/layouts/FormContainer';

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
            navigate('/');
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
                    <h2>Bienvenido</h2>

                    <label className="form-label">
                        ¿Aún no has comprado tu Breeze?
                        <br />
                        <Link to="/breeze">Cómpralo aquí</Link>
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

                    <Input name="password" type="password">
                        Contraseña
                    </Input>

                    <Link
                        to="/forgot-password"
                        className="text- mt-4 text-neutral-400 underline"
                    >
                        Olvidé mi contraseña
                    </Link>
                    <button
                        className="btn-submit mr-40"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </FormProvider>
        </FormContainer>
    );
};

export default Login;
