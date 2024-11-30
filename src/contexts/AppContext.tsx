import React, { createContext, useState } from 'react';
import type {
    ToastMessage,
    AppContext as AppContextType,
} from '../types/mainTypes';
import Toast from '../components/common/Toast';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const showToast = (toastMessage: ToastMessage) => {
        setToast(toastMessage);
    };

    return (
        <AppContext.Provider value={{ showToast }}>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error(
            'useAppContext must be used within an AppContextProvider'
        );
    }
    return context;
};
