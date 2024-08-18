import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContextType } from "../interfaces/types";
import { fetchUserProfile } from "../services/authService";


// Création du contexte utilisateur
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser doit être utilisé dans un UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ firstname: string, lastname: string } | null>(null);

    useEffect(() => {
        // Recover user information after login
        const getUser = async () => {
            try {
                const userProfile = await fetchUserProfile();
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                setUser(null);
            }
        };

        if (localStorage.getItem('token')) {
            getUser();
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/connexion';
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};