import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
    name: string;
    type: string;
    children: ReactNode;
    confirmPassword?: boolean;
    customClass?: string;
    validate?: (value: string) => boolean | string;
    notRequired?: boolean;
}

export function Input({
    name,
    type,
    children,
    confirmPassword,
    customClass = '',
    validate,
    notRequired = false,
}: InputProps) {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const validationRules: {
        required?: string;
        validate?: (val: string) => string | boolean;
    } = {};

    if (!notRequired) validationRules.required = 'Este campo es obligatorio';

    if (confirmPassword) {
        validationRules.validate = (val: string) =>
            val === watch('password') || 'Las contraseñas no coinciden';
    }

    if (validate) {
        validationRules.validate = validate;
    }

    return (
        <div className="relative flex flex-col">
            <label htmlFor={name} className="sr-only">
                {String(children)}
            </label>{' '}
            {/* Hidden label for accessibility */}
            <input
                className={`mt-8 h-10 w-10/12 rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary accent-primary ${customClass}`}
                type={type}
                id={name} // Use id for the label
                placeholder={String(children)} // Use children as placeholder
                {...register(name, validationRules)} // Register with input name and validation rules
            />
            {errors[name] && (
                <span className="absolute top-[72px] text-sm text-red-500">
                    {typeof errors[name]?.message === 'string'
                        ? errors[name]?.message
                        : 'Este campo es obligatorio'}
                </span>
            )}
        </div>
    );
}
