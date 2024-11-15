export interface RegisterFormData {
    name: string;
    surnames: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    country: string;
    zipCode: string;
    city: string;
    address: string;
    terms: boolean;
}

export type LogInFormData = {
    email: string;
    password: string;
};

export enum ToastMessageType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type ToastMessage = {
    message: string;
    type: ToastMessageType;
};

export type ToastProps = ToastMessage & {
    onClose: () => void;
};

export type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
};

export interface FreeBreezeApplicationFormData {
    name: string;
    surnames: string;
    email: string;
    country: string;
    zipCode: string;
    city: string;
    address: string;
    comments: string;
    terms: boolean;
}

export interface UserStatistics {
    id: number;
    name: string;
    surnames: string;
    phone: string;
    nodeId: number;
    averageDailyActiveHours: number;
    averageDailyDistance: number;
    nodeLastConnection: string;
}
