import React, { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
    type: string;
    children: ReactNode;
}

export function Input({ type, children }: InputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <input
                className="form-input"
                type={type}
                placeholder={String(children)}
                {...register(type, { required: 'Este campo es obligatorio' })}
            />
            {errors[type] && (
                <span className="text-red-500 text-sm">
                    {(errors[type]?.message as string) ||
                        'Este campo es obligatorio'}
                </span>
            )}
        </div>
    );
}
