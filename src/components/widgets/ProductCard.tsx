// ProductCard.tsx
import React from 'react';
import { getFormattedDate } from '../../utils/DateFormatter';

interface ProductCardProps {
    price: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ price }) => {
    const formattedDate = getFormattedDate(3);

    return (
        <div className="mt-8 h-fit rounded-lg border border-gray px-6 py-4">
            <p className="text-lg font-semibold">Llega el {formattedDate}</p>
            <div className="mt-4 flex">
                <img
                    alt="Breeze"
                    src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731012929/media/tje5wbwnff3ql4xxbvwi.png"
                    className="w-28 rounded-lg border border-gray p-2"
                />
                <div className="ml-4">
                    <p className="text-lg font-light">Breeze</p>
                    <p className="text-xl font-semibold">
                        {price.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
