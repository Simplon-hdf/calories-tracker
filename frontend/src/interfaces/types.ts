import { ReactNode } from "react";

export interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Typage des props de AuthProvider
export interface AuthProviderProps {
  children: ReactNode;
}

// Type definition for the user context
export interface UserContextType {
  user: { firstname: string, lastname: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ firstname: string, lastname: string, email:string } | null>>;
  logout: () => void;
}


export interface LoginResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface ProgramProps {
  title: string; 
  paragraph: string;
}