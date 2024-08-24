import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { SignupCustomerFormData } from '../../interfaces/types';
import { signupCustomer } from '../../services/authService';

/**
 * Signup component for user registration
 * @returns {JSX.Element}
 */
function Signup(): JSX.Element {
  const [formSignup, setFormSignup] = useState<SignupCustomerFormData>({
    pseudo: '',
    email: '',
    password: '',
    weight: 0,
    height: 0,
    gender: '',
    birthDate: ''
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
    const { name, value } = e.target;
    setFormSignup({
      ...formSignup,
      [name]: value,
    });
  };
  const sanitizeInput = (value: string) => {
    const element = document.createElement('div');
    element.innerText = value;
    return element.innerHTML;
  };

  const formatBirthDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0'); // Ajouter un 0 si le jour est < 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc ajouter 1
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedDate = new Date(formSignup.birthDate)
    // Basic client-side validation
    if (
      !formSignup.pseudo ||
      !formSignup.email ||
      !formSignup.password ||
      !formSignup.weight ||
      !formSignup.height ||
      !formSignup.gender ||
      !formSignup.birthDate
    ) {
      setError('Tous les champs sont requis !');
      return;
    }
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formSignup.email)) {
      setError('Adresse mail est invalide !');
      return;
    }
    const formattedBirthDate = formatBirthDate(formSignup.birthDate);
    // Sanitize inputs before sending to the server
    const sanitizedFormSignup = {
      pseudo: sanitizeInput(formSignup.pseudo),
      email: sanitizeInput(formSignup.email),
      password: sanitizeInput(formSignup.password),
      gender: sanitizeInput(formSignup.gender),
      weight: formSignup.weight,
      height: formSignup.height,
      birthDate: sanitizeInput(formattedBirthDate)
    };
    try {
      await signupCustomer(sanitizedFormSignup);
      setSuccess('Vous vous êtes incrit(e) avec succès!');
      setError(null); // Clear any previous error
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 1000);
      setFormSignup({ pseudo: '', email: '', password: '', weight: 0, height: 0, gender: '', birthDate: '' }); // Reset the form
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
            name="pseudo"
            placeholder="Pseudonyme"
            value={formSignup.pseudo}
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
          <div className='container-label'>
            <label>
              <input
                type="radio"
                name="gender"
                value="masculin"
                checked={formSignup.gender === 'masculin'}
                onChange={handleChange}
              /> Homme
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="feminin"
                checked={formSignup.gender === 'feminin'}
                onChange={handleChange}
              /> Femme
            </label>
          </div>
          <div className="input-group">
            <input
              type="number"
              name="weight"
              placeholder="Masse"
              value={formSignup.weight}
              onChange={handleChange}
              className="input-number"
            />
            <span className="input-unit">kg</span>
          </div>
          <div className="input-group">
            <input
              type="number"
              name="height"
              placeholder="Taille"
              value={formSignup.height}
              onChange={handleChange}
              className="input-number"
            />
            <span className="input-unit">cm</span>
          </div>
          <input
            type="date"
            name="birthDate"
            placeholder="Date de naissance"
            value={formSignup.birthDate}
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
