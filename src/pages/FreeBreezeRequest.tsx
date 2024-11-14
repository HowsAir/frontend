import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../components/common/Input';
import CustomCheckbox from '../components/common/CustomCheckbox';
import { FreeBreezeRequestFormData } from '../types/mainTypes';

const FreeBreezeRequest = () => {
    const methods = useForm<FreeBreezeRequestFormData>();

    const onSubmit = methods.handleSubmit(async (data) => {
        // Handle form submission
        console.log(data);
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
                        <div className="mb-6 inline-flex w-full justify-between">
                            <Input
                                name="name"
                                type="text"
                                validate={(value) =>
                                    /^[A-Za-z\s-]+$/.test(value) ||
                                    'Solo se permiten letras y espacios'
                                }
                                customClass="w-full"
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
                                customClass="w-full"
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
                            customClass="mt-1 w-full"
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
                                customClass="w-full"
                            >
                                Dirección
                            </Input>
                        </div>

                        <div className="inline-flex w-full justify-between">
                            <Input
                                name="country"
                                type="text"
                                value="España"
                                readOnly
                                customClass="w-full"
                            >
                                España
                            </Input>

                            <Input
                                name="city"
                                type="text"
                                value="Valencia"
                                readOnly
                                customClass="w-full"
                            >
                                Valencia
                            </Input>

                            <Input
                                name="zipCode"
                                type="text"
                                customClass="w-full"
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
                            })}
                            className="mt-1 h-32 w-full resize-none rounded-lg border border-gray bg-offwhite p-3 focus:outline-primary"
                        />
                    </div>

                    <div className="mx-4 my-4">
                        <CustomCheckbox />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn-primary mx-auto mt-2"
                        >
                            Enviar solicitud
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default FreeBreezeRequest;
