export const passwordValidation = (value: string): string | boolean => {
    if (value.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(value)) {
        return 'La contraseña debe tener al menos una letra mayúscula';
    }
    if (!/[a-z]/.test(value)) {
        return 'La contraseña debe tener al menos una letra minúscula';
    }
    if (!/[0-9]/.test(value)) {
        return 'La contraseña debe tener al menos un número';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'La contraseña debe tener al menos un carácter especial';
    }

    return true; 
};
