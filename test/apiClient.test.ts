/**
 * @file apiClient.test.ts
 * @brief Unit tests for API client functions
 * @authors Juan Diaz and Mario Luis
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

declare var global: any;
import * as apiClient from '../src/api/apiClient';
import { MeasurementData } from '../src/api/data';
import { LogInFormData, RegisterFormData } from '../src/types/mainTypes';

describe('API Client Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.stubGlobal('console', { error: vi.fn() });
    });

    describe('getMeasurements', () => {
        beforeEach(() => {
            vi.resetAllMocks();
            vi.stubGlobal('console', { error: vi.fn() });
        });

        it('should successfully get measurements', async () => {
            const mockMeasurements: MeasurementData[] = [
                {
                    id: '1',
                    timestamp: new Date(),
                    o3Value: 400,
                    no2Value: 25,
                    coValue: 0.5,
                    latitude: 100.8,
                    longitude: 45.1,
                },
                {
                    id: '2',
                    timestamp: new Date(),
                    o3Value: 410,
                    no2Value: 26,
                    coValue: 0.5,
                    latitude: 10.5,
                    longitude: 10.7,
                },
            ];

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockMeasurements),
            });

            const result = await apiClient.getMeasurements();

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/measurements'),
                expect.any(Object)
            );
            expect(result).toEqual(mockMeasurements);
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Server error';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(apiClient.getMeasurements()).rejects.toThrow(
                apiClient.API_ERRORS.GET_MEASUREMENTS
            );
            expect(console.error).toHaveBeenCalled();
        });

        it('should handle fetch errors', async () => {
            global.fetch = vi
                .fn()
                .mockRejectedValue(new Error('Network error'));

            await expect(apiClient.getMeasurements()).rejects.toThrow(
                apiClient.API_ERRORS.GET_MEASUREMENTS
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('register', () => {
        it('should register the user successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
            });

            const registerData: RegisterFormData = {
                name: 'Mario',
                surnames: 'Falso',
                email: 'mariofalso@example.com',
                password: 'password123',
                confirmPassword: 'password123',
                phone: '123456789',
                country: 'Spain',
                city: 'Valencia',
                address: 'Calle Falsa 123',
                zipCode: '46001',
                terms: true,
            };

            await expect(
                apiClient.register(registerData)
            ).resolves.not.toThrow();
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/users'),
                expect.any(Object)
            );
        });

        it('should handle unsuccessful response on register', async () => {
            const errorMessage = 'Error registering user';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            const registerData: RegisterFormData = {
                name: 'Mario',
                surnames: 'Falso',
                email: 'mariofalso@example.com',
                password: 'password123',
                confirmPassword: 'password123',
                phone: '123456789',
                country: 'Spain',
                city: 'Valencia',
                address: 'Calle Falsa 123',
                zipCode: '46001',
                terms: true,
            };

            await expect(apiClient.register(registerData)).rejects.toThrow();
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should log in successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
            });

            const loginData: LogInFormData = {
                email: 'juan@example.com',
                password: 'password123',
            };

            await expect(apiClient.login(loginData)).resolves.not.toThrow();
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/auth/login'),
                expect.any(Object)
            );
        });

        it('should handle unsuccessful response on login', async () => {
            const errorMessage = 'Incorrect credentials';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            const loginData: LogInFormData = {
                email: 'juan@example.com',
                password: 'password123',
            };

            await expect(apiClient.login(loginData)).rejects.toThrow(
                apiClient.API_ERRORS.LOGIN_USER
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('createCheckoutSession', () => {
        it('should create a checkout session successfully', async () => {
            const mockSessionId = 'session_id_123';
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: mockSessionId }),
            });

            const amount = 5000;

            const result = await apiClient.createCheckoutSession(amount);
            expect(result).toEqual(mockSessionId);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/checkout'),
                expect.any(Object)
            );
        });

        it('should handle unsuccessful response on creating checkout session', async () => {
            const errorMessage = 'Error creating checkout session';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            const amount = 5000;

            await expect(
                apiClient.createCheckoutSession(amount)
            ).rejects.toThrow(apiClient.API_ERRORS.CREATE_CHECKOUT_SESSION);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('validateToken', () => {
        it('should validate token successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(),
            });

            await expect(apiClient.validateToken()).resolves.not.toThrow();
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/auth/validate'),
                expect.any(Object)
            );
        });

        it('should handle unsuccessful response on token validation', async () => {
            const errorMessage = 'Invalid token';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(apiClient.validateToken()).rejects.toThrow(
                'Error validating token'
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('logout', () => {
        it('should log out successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
            });

            await expect(apiClient.logout()).resolves.not.toThrow();
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/v1/auth/logout'),
                expect.any(Object)
            );
        });

        it('should handle unsuccessful response on logout', async () => {
            const errorMessage = 'Error logging out';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(apiClient.logout()).rejects.toThrow(
                'Error logging out'
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('getUserStatistics', () => {
        it('should fetch user statistics successfully', async () => {
            const statistics = [{ id: 1, value: 100 }];
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ usersStatistics: statistics }),
            });

            await expect(apiClient.getUserStatistics()).resolves.toEqual(
                statistics
            );
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error fetching user statistics';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(apiClient.getUserStatistics()).rejects.toThrow(
                'Error fetching user statistics'
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('getUserProfile', () => {
        it('should fetch user profile successfully', async () => {
            const profile = {
                name: 'John Doe',
                email: 'john@example.com',
                photoUrl: '',
            };
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ user: profile }),
            });

            await expect(apiClient.getUserProfile()).resolves.toEqual(profile);
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error fetching user profile';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(apiClient.getUserProfile()).rejects.toThrow(
                'Error fetching user profile'
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('submitFreeBreezeApplication', () => {
        it('should submit free Breeze application successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            const data = {
                name: 'Mario',
                surnames: 'Luis',
                email: 'mario.luis.mesa2001@gmail.com',
                country: 'España',
                zipCode: '46001',
                city: 'Valencia',
                address: 'Calle mia',
                comments:
                    'Hola que tal esto es un test, un test muy largo esto es un test. Tengo que superar 20 caracteres o asi creo.',
                terms: true,
            };

            await expect(
                apiClient.submitFreeBreezeApplication(data)
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error submitting free Breeze application';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            const data = {
                name: 'Mario',
                surnames: 'Luis',
                email: 'mario.luis.mesa2001@ail.com',
                country: 'España',
                zipCode: '46001',
                city: 'Valencia',
                address: 'Calle mia',
                comments: 'Hola',
                terms: true,
            };

            await expect(
                apiClient.submitFreeBreezeApplication(data)
            ).rejects.toThrow(apiClient.API_ERRORS.FREE_BREEZE_APPLICATION);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('forgotPasswordEmail', () => {
        it('should send password reset email successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            await expect(
                apiClient.forgotPasswordEmail('test@example.com')
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error sending password reset email';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(
                apiClient.forgotPasswordEmail('test@example.com')
            ).rejects.toThrow(apiClient.API_ERRORS.FORGOT_PASSWORD_EMAIL);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('forgotPasswordToken', () => {
        it('should verify password reset code successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            const data = { email: 'test@example.com', code: '123456' };

            await expect(
                apiClient.forgotPasswordToken(data)
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error verifying password reset code';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            const data = { email: 'test@example.com', code: '123456' };

            await expect(apiClient.forgotPasswordToken(data)).rejects.toThrow(
                apiClient.API_ERRORS.FORGOT_PASSWORD_TOKEN
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('resetPassword', () => {
        it('should reset password successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            await expect(
                apiClient.resetPassword('newPassword')
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error resetting password';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(
                apiClient.resetPassword('newPassword')
            ).rejects.toThrow(apiClient.API_ERRORS.RESET_PASSWORD);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('sendConfirmationEmail', () => {
        it('should send confirmation email successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            await expect(
                apiClient.sendConfirmationEmail('test@example.com')
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error sending confirmation email';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(
                apiClient.sendConfirmationEmail('test@example.com')
            ).rejects.toThrow(apiClient.API_ERRORS.SEND_CONFIRMATION_EMAIL);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('validateEmailConfirmationToken', () => {
        it('should validate email confirmation token successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({}),
            });

            await expect(
                apiClient.validateEmailConfirmationToken('test@example.com')
            ).resolves.toBeUndefined();
        });

        it('should handle unsuccessful response', async () => {
            const errorMessage = 'Error validating email confirmation token';
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                json: () => Promise.resolve({ message: errorMessage }),
            });

            await expect(
                apiClient.validateEmailConfirmationToken('test@example.com')
            ).rejects.toThrow(
                apiClient.API_ERRORS.VALIDATE_EMAIL_CONFIRMATION_TOKEN
            );
            expect(console.error).toHaveBeenCalled();
        });
    });
});
