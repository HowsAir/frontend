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
        <div className="flex flex-col mt-4 relative">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    className="hidden"
                    {...register('terms', {
                        required: 'Debes aceptar los términos',
                    })}
                />
                <label
                    htmlFor="terms"
                    className="flex items-center cursor-pointer"
                >
                    <div
                        className={`h-5 w-5 border-2 rounded mr-2 flex items-center justify-center ${
                            isChecked
                                ? 'border-primary'
                                : 'border-gray bg-offwhite'
                        }`}
                    >
                        {isChecked && (
                            <div className="h-3 w-3 bg-primary rounded" />
                        )}
                    </div>
                    Acepto los&nbsp;
                    <Link
                        to="/terms-and-privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline font-semibold"
                    >
                        términos, condiciones y privacidad
                    </Link>
                </label>
            </div>
            {errors.terms && (
                <span className="absolute top-[20px] text-red-500 text-sm mt-1">
                    {typeof errors.terms?.message === 'string' &&
                        errors.terms.message}
                </span>
            )}
        </div>
    );
};

export default CustomCheckbox;
