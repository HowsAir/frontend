import { useEffect } from 'react';
import { ToastProps } from '../../types/mainTypes';

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles =
        type === 'SUCCESS'
            ? 'bg-primary'
            : 'bg-red-500';
    return (
        <div
            className={`fixed top-32 right-9 z-50 rounded-md text-white px-6 py-4 ${styles}`}
        >
            <div className="flex justify-center items-center">
                <span className="text-sm font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
