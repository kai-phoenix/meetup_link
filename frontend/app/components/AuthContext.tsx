'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);
    
    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    
    return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
}
    return context;
};