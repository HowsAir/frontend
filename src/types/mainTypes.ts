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

export type ChangePasswordFormData = {
    password: string;
    newPassword: string;
    verifyPassword: string;
}

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

export interface AppContext {
    showToast: (toastMessage: ToastMessage) => void;
}

export interface AuthContextType {
    roleId: number | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    validateAuth: () => Promise<void>;
}

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

export interface Measurement {
    timestamp: string;
    airQuality: string;
    proportionalValue: number;
    gas: string;
    ppmValue: number;
}

export enum OverallAirQuality {
    "Good" = "Buena",
    "Regular" = "Regular",
    "Bad" = "Peligrosa"
}