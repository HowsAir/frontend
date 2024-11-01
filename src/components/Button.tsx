import React, { ReactNode } from 'react';

interface ButtonProps {
    color?: 'primary' | 'secondary';
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, color = 'primary' }) => {
    const txtColor = color === 'primary' ? 'offwhite' : 'primary';
    const bgColor = color === 'primary' ? 'primary' : 'offwhite';

    return (
        <a className={`h-fit px-12 py-3 rounded-lg text-${txtColor} bg-${bgColor}`}>
            {children}
        </a>
    );
}

export default Button;