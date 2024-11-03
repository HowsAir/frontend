import React, { useState } from 'react';

interface FormContainerProps {
    children: React.ReactNode;
    onSubmitSuccess?: () => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
    children,
    onSubmitSuccess,
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSuccess = () => {
        setIsSubmitted(true);
        onSubmitSuccess && onSubmitSuccess(); // Trigger the callback if provided
    };

    return (
        <div className="w-fit h-fit min-h-[70dvh] flex flex-row mx-auto">
            {isSubmitted ? (
                <div className="w-[35dvw] bg-form bg-cover sm:hidden lg:flex flex-col justify-between rounded-bl-lg rounded-tl-lg p-8">
                    <div>
                        <h1>HowsAir</h1>
                        <h3 className="text-offwhite w-72">
                            REGISTERED CORRECTLY!!
                        </h3>
                    </div>
                    <span className="text-sm text-offwhite">
                        Todos los derechos reservados.
                    </span>
                </div>
            ) : (
                <>
                    <div className="w-[35dvw] bg-form bg-cover sm:hidden lg:flex flex-col justify-between rounded-bl-lg rounded-tl-lg p-8">
                        <div>
                            <h1>HowsAir</h1>
                            <h3 className="text-offwhite w-72">
                                Conoce la calidad del aire que respiras en
                                segundos
                            </h3>
                        </div>
                        <span className="text-sm text-offwhite">
                            Copyright 2024 HowsAir. Todos los derechos
                            reservados.
                        </span>
                    </div>
                    {children}
                </>
            )}
        </div>
    );
};

export default FormContainer;
