import { SignupFormData, LoginFormData, LoginResponse } from "../interfaces/types";
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



// Login service
export const loginUser = async (formLogin: LoginFormData): Promise<LoginResponse> => {
  const data = await fetchJson('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formLogin),
  });
  localStorage.setItem('token', data.token);
  localStorage.setItem('userFirstName', data.user.firstname);
  localStorage.setItem('userLastName', data.user.lastname);
  localStorage.setItem('userEmail', data.user.email);
  return data;
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
