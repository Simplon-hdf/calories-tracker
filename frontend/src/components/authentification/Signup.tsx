import React, { useEffect, useState } from 'react';
import { signupUser } from '../../services/authService';
import { SignupFormData } from '../../interfaces/types';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Signup component for user registration
 * @returns {JSX.Element}
 */
function Signup(): JSX.Element {
  const [formSignup, setFormSignup] = useState<SignupFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/accueil'); // Redirect the user to the dashboard
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignup({
      ...formSignup,
      [e.target.name]: e.target.value,
    });
  };
  const sanitizeInput = (value: string) => {
    const element = document.createElement('div');
    element.innerText = value;
    return element.innerHTML;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (!formSignup.firstname || !formSignup.lastname || !formSignup.email || !formSignup.password) {
      setError('Tous les champs sont requis !');
      return;
    }
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formSignup.email)) {
      setError('Adresse mail est invalide !');
      return;
    }
    // Sanitize inputs before sending to the server
    const sanitizedFormSignup = {
      firstname: sanitizeInput(formSignup.firstname),
      lastname: sanitizeInput(formSignup.lastname),
      email: sanitizeInput(formSignup.email),
      password: sanitizeInput(formSignup.password),
    };
    try {
      await signupUser(sanitizedFormSignup);
      setSuccess('Vous vous êtes incrit(e) avec succès!');
      setError(null); // Clear any previous error
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 1000);
      setFormSignup({ firstname: '', lastname: '', email: '', password: '' }); // Reset the form
    } catch (error) {
      console.error("Une erreur durant l'inscription:", error);
      setError("Echec d'inscription");
    }
  };
  return (
    <div className='container-form'>
      <div className='formSignup'>
        <p className="heading">Inscription</p>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <input
            type="text"
            name="firstname"
            placeholder="Prenom"
            value={formSignup.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formSignup.lastname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formSignup.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formSignup.password}
            onChange={handleChange}
          />
          <Link to="/" className='link-login'>
            Déjà inscrit? <span>Clique <i>ici</i></span>
          </Link>
          <button id="buttonSignup" type="submit">Soumettre</button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
