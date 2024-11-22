import React, { createContext, useContext, useEffect, useState } from 'react';
import * as apiClient from '../api/apiClient';

interface AuthContextProps {
    isAuthenticated: boolean;
    roleId: number | null;
    login: (token: string) => void;
    logout: () => void;
    validateToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roleId, setRoleId] = useState<number | null>(null);

    const validateToken = async () => {
        try {
            const response = await apiClient.validateToken();
            setIsAuthenticated(true);
            setRoleId(response.roleId); // Set role based on response
        } catch (error) {
            console.error('Token validation failed:', error);
            setIsAuthenticated(false);
            setRoleId(null); // Reset role if token is invalid
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        validateToken(); // Validate token after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRoleId(null);
    };

    useEffect(() => {
        validateToken(); // Validate token on initial load
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, roleId, login, logout, validateToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
