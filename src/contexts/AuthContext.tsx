// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateToken } from '../api/apiClient';
import { AuthContextType } from '../types/mainTypes';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [roleId, setRoleId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const validateAuth = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { roleId } = await validateToken();
            setRoleId(roleId);
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
            setRoleId(null);
            setError(
                err instanceof Error ? err.message : 'Authentication failed'
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateAuth();
    }, []);

    const value = {
        roleId,
        isAuthenticated,
        isLoading,
        error,
        validateAuth,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
