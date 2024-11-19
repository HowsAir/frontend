import { Link } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LogInFormData } from '../types/mainTypes';

const EditProfile = () => {
    const [data, setData] = useState();
    const methods = useForm<LogInFormData>();

    return (
        <div className="mx-auto flex h-fit w-[40dvw] flex-col rounded-lg border-[1px] border-gray bg-white px-20 py-12">
            <h2 className="mx-auto">Editar perfil</h2>
            <div className="relative">
                <img
                    src="../../public/profile-pic.jfif"
                    className="mx-auto size-40 rounded-full"
                    alt="Foto de perfil"
                />
                <button className="absolute right-32 top-28 w-fit rounded-full border-4 border-white bg-gray p-2">
                    <img className='size-fit' src='../../public/icons/pencil-icon.svg' alt='Editar'></img>
                </button>
            </div>
            <p className="mx-auto mt-6 text-lg">pepe@mail.fake</p>
            <FormProvider {...methods}>
                <div className="grid grid-flow-row grid-cols-2 gap-4">
                    <Input name="name" type="text" customClass='w-full'>
                        Nombre
                    </Input>
                    <Input name="surnames" type="text" customClass='w-full'>
                        Apellidos
                    </Input>
                </div>
            </FormProvider>
            <Link to="/change-password" className="mt-8 text-center btn-primary font-medium text-base w-full">
                Cambiar contraseña
            </Link>
            <button className="mt-8 w-full font-medium text-base btn-primary disabled:bg-gray disabled:text-offblack">
                Guardar cambios
            </button>
        </div>
    );
};

export default EditProfile;
