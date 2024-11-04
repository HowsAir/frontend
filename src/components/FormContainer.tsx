import React, { useState } from 'react';

interface FormContainerProps {
    children: React.ReactNode;
    step: number;
    price?: number;
}

const FormContainer: React.FC<FormContainerProps> = ({
    children,
    step,
    price,
}) => {
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
                    <div className="form-cart flex flex-col">
                        <div className="flex gap-4 pb-5 border-b-2 border-offwhite">
                            <img
                                src={'../../public/icons/shopping-cart.svg'}
                                alt="Shopping Cart"
                            />
                            <p className="text-[30px] font-medium text-offwhite">
                                Tu cesta
                            </p>
                        </div>

                        <div className="flex gap-4 py-8 px-4 border-b-2 border-offwhite">
                            <img
                                src={'../../public/icons/percent.svg'}
                                alt="Percent"
                            />
                            <input
                                className="form-input mt-0"
                                placeholder="Código de descuento"
                            ></input>
                        </div>

                        <div className="py-8 px-4 border-b-2 border-offwhite space-y-6">
                            <p className="text-xl text-offwhite font-semibold">
                                Resumen del pedido
                            </p>
                            <p className="flex justify-between text-xl text-offwhite font-extralight">
                                Subtotal
                                <span className="mr-4 font-normal">
                                    {price}.00 €
                                </span>
                            </p>
                            <p className="flex justify-between text-xl text-offwhite font-extralight">
                                Envío
                                <span className="mr-4 font-normal">5.00 €</span>
                            </p>
                        </div>

                        <div className="py-8 px-4">
                            <p className="flex justify-between text-xl text-offwhite font-semibold">
                                Total
                                <span className="mr-4 font-normal">104.00 €</span>
                            </p>
                        </div>

                        <button type="submit" className="mt-auto btn-inverted w-full">
                            Pagar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormContainer;
