import React, { useEffect, useState } from 'react';
import { signupUser } from '../../services/authService';
import { SignupFormData, AddressSuggestion } from '../../interfaces/types';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    phone: '',
    weight: '',
    height: '',
    gender: '',
    address: '',
    city:'',
    zip_code:''
  });

  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const fetchAddressSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      const suggestions: AddressSuggestion[] = response.data.features;
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions d'adresse:", error);
    }
  };

  const handleAddressSelect = (selectedAddress: AddressSuggestion) => {
    const { housenumber, street, postcode, city } = selectedAddress.properties;
    
    setFormSignup({
      ...formSignup,
      address: `${housenumber ? housenumber + ' ' : ''}${street}`, // Combinaison du numéro de maison et du nom de la rue
      city: city, // La ville
      zip_code: postcode, // Le code postal
    });
    
    setAddressSuggestions([]); // Effacer les suggestions après la sélection
  };

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
    if (name === 'address' && value.length > 3) {
      fetchAddressSuggestions(value);
    }
  };
  const sanitizeInput = (value: string) => {
    const element = document.createElement('div');
    element.innerText = value;
    return element.innerHTML;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (
      !formSignup.firstname ||
      !formSignup.lastname ||
      !formSignup.email ||
      !formSignup.password ||
      !formSignup.phone ||
      !formSignup.weight ||
      !formSignup.height ||
      !formSignup.gender ||
      !formSignup.address ||
      !formSignup.city ||
      !formSignup.zip_code
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
    // Sanitize inputs before sending to the server
    const sanitizedFormSignup = {
      firstname: sanitizeInput(formSignup.firstname),
      lastname: sanitizeInput(formSignup.lastname),
      email: sanitizeInput(formSignup.email),
      password: sanitizeInput(formSignup.password),
      phone: sanitizeInput(formSignup.phone),
      weight: sanitizeInput(formSignup.weight),
      height: sanitizeInput(formSignup.height),
      gender: sanitizeInput(formSignup.gender),
      address: sanitizeInput(formSignup.address),
      city: sanitizeInput(formSignup.city),
      zip_code: sanitizeInput(formSignup.zip_code),

    };
    try {
      await signupUser(sanitizedFormSignup);
      setSuccess('Vous vous êtes incrit(e) avec succès!');
      setError(null); // Clear any previous error
      setTimeout(() => {
        navigate('/'); // Redirect to the login page
      }, 1000);
      setFormSignup({ firstname: '', lastname: '', email: '', password: '', phone: '', weight: '', height: '', gender: '', address: '',city: '', zip_code: '' }); // Reset the form
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
            placeholder="Prénom"
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
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={formSignup.phone}
            onChange={handleChange}
          />
          <input
            type="number"
            name="weight"
            placeholder="Masse en (kg)"
            value={formSignup.weight}
            onChange={handleChange}
          />
          <input
            type="number"
            name="height"
            placeholder="Taille (cm)"
            value={formSignup.height}
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
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={formSignup.address}
            onChange={handleChange}
          />
          {addressSuggestions.length > 0 && (
            <ul className="address-suggestions">
              {addressSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleAddressSelect(suggestion)}>
                  {suggestion.properties.label}
                </li>
              ))}
            </ul>
          )}
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
