import React from 'react';

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
        <div className="mx-auto flex h-fit min-h-[80dvh] w-fit flex-row">
            {step === 1 ? (
                <>
                    <div className="w-[40dvw] flex-col justify-between rounded-bl-lg rounded-tl-lg bg-form bg-cover p-8 sm:hidden lg:flex">
                        <div>
                            <h1>HowsAir</h1>
                            <h3 className="w-72 text-offwhite">
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
                    <div className="flex w-[40dvw] flex-col rounded-br-lg rounded-tr-lg bg-form bg-cover px-24 py-14">
                        <div className="flex gap-4 border-b-2 border-offwhite pb-5">
                            <img
                                src={'../../public/icons/shopping-cart.svg'}
                                alt="Shopping Cart"
                            />
                            <p className="text-[30px] font-medium text-offwhite">
                                Tu cesta
                            </p>
                        </div>

                        <div className="flex gap-4 border-b-2 border-offwhite px-4 py-8">
                            <img
                                src={'../../public/icons/percent.svg'}
                                alt="Percent"
                            />
                            <input
                                className="mt-0 h-10 w-10/12 rounded-lg border-[1px] border-gray bg-offwhite p-2 placeholder-neutral-300 caret-primary focus:outline-primary"
                                placeholder="Código de descuento"
                            ></input>
                        </div>

                        <div className="space-y-6 border-b-2 border-offwhite px-4 py-8">
                            <p className="text-xl font-semibold text-offwhite">
                                Resumen del pedido
                            </p>
                            <p className="flex justify-between text-xl font-extralight text-offwhite">
                                Subtotal
                                <span className="mr-4 font-normal">
                                    {price}.00 €
                                </span>
                            </p>
                            <p className="flex justify-between text-xl font-extralight text-offwhite">
                                Envío
                                <span className="mr-4 font-normal">5.00 €</span>
                            </p>
                        </div>

                        <div className="px-4 py-8">
                            <p className="flex justify-between text-xl font-semibold text-offwhite">
                                Total
                                <span className="mr-4 font-normal">
                                    104.00 €
                                </span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn-inverted mt-auto w-full"
                        >
                            Pagar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormContainer;
