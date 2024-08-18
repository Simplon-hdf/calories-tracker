import React, { createContext, useContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../interfaces/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth doit être utilisé avec un AuthProvider');
    }
    return context;
  };

  export const AuthProvider:  React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return !!localStorage.getItem('token');
    });
  
    const login = () => {
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.href = '/connexion';
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }; 