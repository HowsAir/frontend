import React, { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
    name: string;
    type: string;
    children: ReactNode;
    confirmPassword?: boolean;
}

export function Input({
    name,
    type,
    children,
    confirmPassword,
}: InputProps) {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const validationRules: {
        required: string;
        validate?: (val: string) => string | boolean;
    } = {
        required: 'Este campo es obligatorio',
    };

    if (confirmPassword) {
        validationRules.validate = (val: string) =>
            val === watch('password') || 'Las contraseñas no coinciden';
    }

    return (
        <div className='flex flex-col'>
            <input
                className='form-input'
                type={type} // Input type
                placeholder={String(children)} // Use the children as the placeholder
                {...register(name, validationRules)} // Register with the input name and validation rules
            />
            {errors[name] && ( // Access the error using the name
                <span className="text-red-500 text-sm">
                    {(errors[name]?.message as string) ||
                        'Este campo es obligatorio'}
                </span>
            )}
        </div>
    );
}
