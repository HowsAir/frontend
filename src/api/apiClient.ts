/**
 * @file apiClient.ts
 * @brief API client functions for interacting with the backend API
 * @author Juan Diaz
 */

import { MeasurementData } from './data';
import {
    LogInFormData,
    RegisterFormData,
    FreeBreezeApplicationFormData,
} from '../types/mainTypes';

import { UserStatistics, UserProfile } from '../api/data';

const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';
const API_BASE_URL = NODE_ENV === 'development' ? 'http://localhost:3000' : '';

export const API_ERRORS = {
    GET_MEASUREMENTS: 'Error al obtener las mediciones',
    REGISTER_USER: 'Error al registrar al usuario',
    CREATE_CHECKOUT_SESSION: 'Error al crear la sesión de pago',
    LOGIN_USER: 'Error al iniciar sesión',
    FREE_BREEZE_APPLICATION: 'Error al enviar la solicitud de Breeze gratuito',
    FORGOT_PASSWORD_EMAIL:
        'Si el correo pertenece a una cuenta existente, recibirá un correo electrónico con un enlace para restablecer la contraseña.',
    FORGOT_PASSWORD_TOKEN:
        'Error al verificar el código de restablecimiento de contraseña',
    RESET_PASSWORD: 'Error al restablecer la contraseña',
    // Additional error messages for other functions can be added here
} as const;

/**
 * @brief Fetches all stored measurements from the API
 * @author Juan Diaz
 *
 * getMeasurements -> Promise<MeasurementData[]>
 *
 * This function makes a GET request to the API endpoint to retrieve
 * all stored measurements. It uses fetch to make the HTTP request and
 * handles both success and failure responses.
 *
 * @throws Error - If the request fails or the response is invalid
 * @returns A promise resolved with an array of MeasurementData objects
 */
export const getMeasurements = async (): Promise<MeasurementData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/measurements`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error fetching measurements');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.GET_MEASUREMENTS);
    }
};

/**
 * @brief Registers a new user with the provided registration data
 * @author Juan Diaz
 *
 * RegisterData: data -> register -> Promise<void>
 *
 * This function makes a POST request to the API to register a new user.
 * It expects the user's registration details such as name, email, and password.
 *
 * @throws Error - If the registration fails or the response is invalid
 * @param {RegisterData} data - The registration details for the user
 * @returns A promise that resolves when the registration is successful
 */
export const register = async (data: RegisterFormData): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error registering user');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.REGISTER_USER);
    }
};

/**
 * @brief Logs in a user with email and password
 * @author Mario Luis
 *
 * LogInFormData: data -> login -> Promise<void>
 *
 * This function makes a POST request to the API to register a new user.
 * It expects the user's registration details such as name, email, and password.
 *
 * @throws Error - If the registration fails or the response is invalid
 * @param {RegisterData} data - The registration details for the user
 * @returns A promise that resolves when the registration is successful
 */

export const login = async (data: LogInFormData): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error logging in');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.LOGIN_USER);
    }
};

/**
 * @brief Initiates a Stripe checkout session with the provided line items
 * @author Juan Diaz
 *
 * @param {number} amount - The total amount for the checkout session
 * @returns {Promise<string>} - A promise that resolves with the id for the Stripe checkout session
 *
 * This function makes a POST request to the API to create a checkout session.
 * It expects the total amount of the purchase
 *
 * @throws Error - If the checkout session creation fails or the response is invalid
 */
export const createCheckoutSession = async (
    amount: number
): Promise<string> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/checkout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error creating checkout session');
        }

        const { id }: { id: string } = await response.json();
        return id; // Return the id for the Stripe checkout session
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.CREATE_CHECKOUT_SESSION);
    }
};

/**
 * @brief Validates the authentication token stored in cookies
 * @author Juan Diaz
 *
 * validateToken -> Promise<void>
 *
 * This function makes a GET request to the API to validate the user's authentication token.
 * It expects a valid token to be stored in the cookies, which will be sent along with the request.
 *
 * @throws Error - If the token is invalid or the request fails
 * @returns A promise that resolves when the token is successfully validated
 */
export const validateToken = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/validate`, {
            method: 'GET',
            credentials: 'include', // Cookie-based authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Token invalid');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error validating token');
    }
};

export const getUserStatistics = async (): Promise<UserStatistics[]> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/users/statistics`,
            {
                method: 'GET',
                credentials: 'include', // Cookie-based authentication
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error fetching user statistics');
        }

        const data = await response.json();
        return data.usersStatistics; // Only return the usersStatistics array
    } catch (error) {
        console.error('Get user statistics error:', error);
        throw new Error('Error fetching user statistics');
    }
};

export const getUserProfile = async (): Promise<UserProfile> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error fetching user profile');
        }

        const data = await response.json();
        data.photoUrl =
            data.photoUrl || 'https://example.com/default-photo.jpg';
        return data.user;
    } catch (error) {
        console.error('Get user profile error: ', error);
        throw new Error('Error fetching user profile');
    }
};

export const updateUserProfile = async (formData: FormData): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/profile`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error updating user profile');
        }
    } catch (error) {
        console.error('Patch user profile error:', error);
        throw new Error('Error updating user profile');
    }
};



export const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
}): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/password`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error changing password');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error changing password');
    }
};

/**
 * @brief Logs out the user by invalidating the current session token
 * @author Juan Diaz
 *
 * logout -> Promise<void>
 *
 * This function makes a POST request to the API to log out the user by invalidating their session.
 * The request uses cookie-based authentication.
 *
 * @throws Error - If the logout process fails or the request is invalid
 * @returns A promise that resolves when the user is successfully logged out
 */
export const logout = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
            method: 'POST',
            credentials: 'include', // Cookie-based authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error during Logout');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error loggin out');
    }
};

/**
 * @brief Submits a free Breeze application
 * @author Manuel Borregales
 *
 * FreeBreezeApplicationData: data -> submitFreeBreezeApplication -> Promise<void>
 *
 * This function makes a POST request to submit a free Breeze application.
 * It sends the user's details and reason for requesting a free Breeze.
 *
 * @throws Error - If the submission fails or the response is invalid
 * @param {FreeBreezeApplicationData} data - The application details
 * @returns A promise that resolves when the application is successfully submitted
 */
export const submitFreeBreezeApplication = async (
    data: FreeBreezeApplicationFormData
): Promise<void> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/auth/free-breeze-application`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(
                message || 'Error submitting free Breeze application'
            );
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.FREE_BREEZE_APPLICATION);
    }
};

/**
 * @brief Sends a password reset email
 * @author Manuel Borregales
 *
 * email: string -> forgotPasswordEmail -> Promise<void>
 *
 * This function makes a POST request to the /auth/forgot-password-code endpoint
 * to send a password reset code to the user's email.
 *
 * @throws Error - If the request fails or the response is invalid
 * @param {string} email - The user's email address
 * @returns A promise that resolves when the password reset email is sent
 */
export const forgotPasswordEmail = async (email: string): Promise<void> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/auth/forgot-password-code`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        );

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error sending password reset email');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.FORGOT_PASSWORD_EMAIL);
    }
};

/**
 * @brief Verifies a password reset code
 * @author Manuel Borregales
 *
 * { email: string, code: string } -> forgotPasswordToken -> Promise<void>
 *
 * This function makes a GET request to the /auth/forgot-password-token endpoint
 * to verify the password reset code provided by the user. If the code is valid,
 * it sets a `password_reset_token` cookie that can be used to reset the password.
 *
 * @throws Error - If the request fails or the response is invalid
 * @param {object} data - An object with the user's email and the reset code
 * @returns A promise that resolves when the password reset code is verified
 */
export const forgotPasswordToken = async (data: {
    email: string;
    code: string;
}): Promise<void> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/auth/forgot-password-token?email=${data.email}&code=${data.code}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error verifying password reset code');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.FORGOT_PASSWORD_TOKEN);
    }
};

/**
 * @brief Resets the user's password
 * @author Manuel Borregales
 *
 * newPassword: string -> resetPassword -> Promise<void>
 *
 * This function makes a PUT request to the /users/reset-password endpoint
 * to reset the user's password. It requires the `password_reset_token` cookie
 * to be present, which was set by the `forgotPasswordToken` function.
 *
 * @throws Error - If the request fails or the response is invalid
 * @param {string} newPassword - The user's new password
 * @returns A promise that resolves when the password is successfully reset
 */
export const resetPassword = async (newPassword: string): Promise<void> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/users/reset-password`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            }
        );

        if (!response.ok) {
            const { message }: { message: string } = await response.json();
            throw new Error(message || 'Error resetting password');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error(API_ERRORS.RESET_PASSWORD);
    }
};
