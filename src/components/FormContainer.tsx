import React, { useState } from 'react';

interface FormContainerProps {
    children: React.ReactNode;
    step: number;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, step }) => {
    return (
        <div className="form-container">
            {step === 1 ? (
                <>
                    <div className="form-card">
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
            ) : (
                <>
                    {children}
                    <div className="form-cart">
                            <p className='text-[30px] font-medium text-offwhite'>Tu cesta</p>
                            <h3 className="text-offwhite w-72">
                                REGISTERED CORRECTLY!!
                            </h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormContainer;
