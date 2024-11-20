import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    role: string | null; // Ejemplo: 'admin' | 'user' | null
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // Verifica si hay un token almacenado
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            setIsAuthenticated(true);
            setRole(decoded.role);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded = decodeToken(token);
        setIsAuthenticated(true);
        setRole(decoded.role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

// Helper para decodificar tokens (ejemplo usando JWT)
const decodeToken = (token: string): { role: string } => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); 
};
