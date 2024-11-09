import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

const CustomCheckbox: React.FC = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const isChecked = !!watch('terms');

    return (
        <div className="relative mt-4 flex flex-col">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    className="sr-only"
                    {...register('terms', {
                        required: 'Debes aceptar los términos',
                    })}
                />
                <label
                    htmlFor="terms"
                    className="flex cursor-pointer items-center"
                >
                    <div
                        className={`mr-2 flex h-5 w-5 items-center justify-center rounded border-2 ${
                            isChecked
                                ? 'border-primary'
                                : 'border-gray bg-offwhite'
                        }`}
                    >
                        {isChecked && (
                            <div className="h-3 w-3 rounded bg-primary" />
                        )}
                    </div>
                    Acepto los&nbsp;
                    <Link
                        to="/terms-and-privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline"
                    >
                        términos, condiciones y privacidad
                    </Link>
                </label>
            </div>
            {errors.terms && (
                <span className="absolute top-[20px] mt-1 text-sm text-red-500">
                    {typeof errors.terms?.message === 'string' &&
                        errors.terms.message}
                </span>
            )}
        </div>
    );
};

export default CustomCheckbox;
