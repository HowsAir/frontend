import { useEffect, useState } from 'react';
import { ToastProps } from '../../types/mainTypes';
import { AnimatePresence, motion } from 'framer-motion';

const Toast = ({ message, type, onClose }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    // Automatically close the toast after a certain time
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        // When the toast is not visible, call onClose after animation
        if (!isVisible) {
            setTimeout(onClose, 300); // Ensure onClose is triggered after exit animation
        }
    }, [isVisible, onClose]);

    const styles = type === 'SUCCESS' ? 'bg-primary text-offwhite' : 'bg-red-500 text-offwhite';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed right-9 max-w-72 top-32 z-50 rounded-md px-6 py-4 ${styles}`}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '150%' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <div className="flex items-center justify-center">
                        <span className="text-base font-semibold">{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
