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

    const styles = type === 'SUCCESS' ? 'bg-primary' : 'bg-red-500';
    return (
        <div
            className={`fixed right-9 top-32 z-50 rounded-md px-6 py-4 text-white ${styles}`}
        >
            <div className="flex items-center justify-center">
                <span className="text-sm font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
