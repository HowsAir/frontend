import { useAppContext } from '../contexts/AppContext';

import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../components/common/Input';
import CustomCheckbox from '../components/common/CustomCheckbox';
import { FreeBreezeApplicationFormData } from '../types/mainTypes';
import { useMutation } from 'react-query';
import * as apiClient from '../api/apiClient';
import { ToastMessageType } from '../types/mainTypes';

const FreeBreezeRequest = () => {
    const { showToast } = useAppContext();
    const methods = useForm<FreeBreezeApplicationFormData>({
        defaultValues: {
            country: 'España',
            city: 'Valencia',
        },
    });
    const mutation = useMutation(apiClient.submitFreeBreezeApplication, {
        onSuccess: () => {
            showToast({
                message:
                    'Solicitud enviada con éxito. Te contactaremos pronto.',
                type: ToastMessageType.SUCCESS,
            });
            methods.reset();
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: ToastMessageType.ERROR,
            });
        },
    });

    const onSubmit = methods.handleSubmit(async (data) => {
        await mutation.mutate(data);
    });
    return (
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-14 shadow-sm">
            <h2 className="mb-4">Solicitud de Breeze gratuito</h2>
            <p className="mb-10 text-xl">
                Rellene este pequeño formulario y comprobaremos tu situación. Si
                has sido aceptado te mandaremos un código del 100% de descuento
                para introducir al final de tu compra.
            </p>

            <FormProvider {...methods}>
                <form noValidate onSubmit={onSubmit} className="">
                    <div className="flex flex-col">
                        <label>Nombre y apellidos</label>
                        <div className="mb-6 inline-flex w-full justify-between gap-4">
                            <Input
                                name="name"
                                type="text"
                                validate={(value) =>
                                    /^[A-Za-z\s-]+$/.test(value) ||
                                    'Solo se permiten letras y espacios'
                                }
                                customClass="w-full !mt-2"
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
                                customClass="w-full !mt-2"
                            >
                                Apellidos
                            </Input>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label>Correo electrónico</label>
                        <Input
                            name="email"
                            type="email"
                            validate={(value) =>
                                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                                'Introduce un email válido'
                            }
                            customClass="!mt-2 w-full"
                        >
                            Email
                        </Input>
                    </div>

                    <div className="mb-6">
                        <div>
                            <div className="flex items-center gap-1">
                                <label>Localización</label>
                                <a
                                    href="#"
                                    className="text-base text-neutral-500 hover:underline"
                                >
                                    ¿Por qué me piden esto?
                                </a>
                            </div>
                            <Input
                                name="address"
                                type="text"
                                customClass="w-full !mt-2"
                            >
                                Dirección
                            </Input>
                        </div>

                        <div className="inline-flex w-full justify-between gap-4">
                            <Input
                                name="country"
                                type="text"
                                value="España"
                                readOnly
                                customClass="w-full !mt-2"
                            >
                                España
                            </Input>

                            <Input
                                name="city"
                                type="text"
                                value="Valencia"
                                readOnly
                                customClass="w-full !mt-2"
                            >
                                Valencia
                            </Input>

                            <Input
                                name="zipCode"
                                type="text"
                                customClass="w-full !mt-2"
                                validate={(value) =>
                                    /^\d{5}$/.test(value) ||
                                    'El código postal debe tener 5 dígitos'
                                }
                            >
                                Código Postal
                            </Input>
                        </div>
                    </div>

                    <div>
                        <label>
                            Cuéntanos por qué quieres tener nuestro producto
                            Breeze
                        </label>
                        <textarea
                            {...methods.register('comments', {
                                required: 'Este campo es obligatorio',
                                minLength: {
                                    value: 20,
                                    message:
                                        'Por favor, proporciona más detalles (mínimo 20 caracteres)',
                                },
                            })}
                            className="mt-1 h-32 w-full resize-none rounded-lg border border-gray bg-offwhite p-3 focus:outline-primary"
                        />
                        {methods.formState.errors.comments && (
                            <p className="mt-1 text-sm text-red-600">
                                {methods.formState.errors.comments.message}
                            </p>
                        )}
                    </div>

                    <div className="mx-4 my-4">
                        <CustomCheckbox />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn-primary mx-auto mt-2"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading
                                ? 'Enviando...'
                                : 'Enviar solicitud'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default FreeBreezeRequest;
