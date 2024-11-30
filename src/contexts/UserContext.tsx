import React, { createContext, useContext, useEffect, useState } from 'react';
import * as apiClient from '../api/apiClient';

interface User {
    name: string;
    surnames: string;
    email: string;
    photoUrl: string;
}

interface UserContextType {
    user: User | null;
    updateUser: (updatedUser: Partial<User>) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    const refreshUser = async () => {
        try {
            const profile = await apiClient.getUserProfile();
            setUser(profile);
        } catch (error) {
            console.error('Failed to refresh user profile:', error);
        }
    };

    const updateUser = async (updatedUser: Partial<User>) => {
        try {
            const formData = new FormData();
            Object.entries(updatedUser).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.append(key, value as string | Blob);
                }
            });
            await apiClient.updateUserProfile(formData);
            setUser((prevUser) =>
                prevUser ? { ...prevUser, ...updatedUser } : null
            );
        } catch (error) {
            console.error('Failed to update user profile:', error);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
