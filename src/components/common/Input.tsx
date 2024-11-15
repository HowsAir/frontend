import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
    name: string;
    type: string;
    children: ReactNode;
    value?: string;
    readOnly?: boolean;
    confirmPassword?: boolean;
    validate?: (value: string) => Promise<string | boolean> | string | boolean;
    notRequired?: boolean;
    customClass?: string;
}

export function Input({
    name,
    type,
    children,
    value,
    readOnly = false,
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
        validate?: (
            val: string
        ) => Promise<string | boolean> | string | boolean;
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
        <div className="relative flex w-full flex-col">
            <input
                className={`mt-8 h-10 w-10/12 rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary ${customClass} ${readOnly && 'bg-zinc-300'} `}
                type={type}
                id={name}
                placeholder={String(children)}
                value={value}
                readOnly={readOnly}
                disabled={readOnly}
                {...register(name, validationRules)}
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
