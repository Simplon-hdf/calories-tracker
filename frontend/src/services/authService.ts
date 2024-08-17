import { SignupFormData } from "../interfaces/types";
export const signupUser = async (formSignup: SignupFormData) => {
    const response = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formSignup),
    });
    // Vérifier si le content type est JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully:', data);
        return data;
      } else {
        console.error('Error creating user:', data.message);
        throw new Error(data.message || 'Error creating user');
      }
    } else {
      console.error('Unexpected content type:', contentType);
      throw new Error('Unexpected response from server');
    }
  };
  