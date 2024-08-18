import { SignupFormData, LoginFormData } from "../interfaces/types";
import { fetchJson } from "../utils/fetchJson";

// Sign up service
export const signupUser = async (formSignup: SignupFormData) => {
  return await fetchJson('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formSignup),
  });
};

export interface LoginResponse {
  token: string;
}

// Login service
export const loginUser = async (formLogin: LoginFormData): Promise<LoginResponse> => {
  return await fetchJson('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formLogin),
  });
};

// Fetch user profile service
export const fetchUserProfile = async () => {
  const response = await fetchJson('http://localhost:3001/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Vérifier si la requête a échoué
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
  }

  return await response.json();
};
