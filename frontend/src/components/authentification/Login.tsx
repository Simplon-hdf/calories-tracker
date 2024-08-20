import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { LoginFormData } from '../../interfaces/types';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

/**
 * Login component to connect
 * @returns {JSX.Element}
 */
function Login(): JSX.Element {
  const { setUser } = useUser();
  const [formLogin, setFormLogin] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();  // Use to redirect
  // Typing for handleChange to handle input change events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const sanitizeInput = (value: string) => {
    const element = document.createElement('div');
    element.innerText = value;
    return element.innerHTML;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formLogin.email || !formLogin.password) {
      setError('Tous les champs sont requis !');
      return;
    }
    // Sanitize inputs before sending to the server
    const sanitizedFormLogin = {
      email: sanitizeInput(formLogin.email),
      password: sanitizeInput(formLogin.password),
    };

    try {
      const data = await loginUser(sanitizedFormLogin);
      localStorage.setItem('token', data.token);  // Assuming data contains a token
      console.log(data);
      setUser(data.user);
      setSuccess('Vous vous êtes connecté(e) avec succès!');
      setError(null); // Clear any previous error
      setFormLogin({ email: '', password: '' }); // Reset the form
      //Redirect to dashboard after login
      navigate('/accueil');
    } catch (error) {
      console.error("Une erreur durant l'inscription:", error);
      setError("Echec de la connexion");
    }
  };


  return (
    <div className='container-form'>
      <div className='formLogin'>
        <p className="heading">Connexion</p>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formLogin.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formLogin.password}
            onChange={handleChange}
          />
          <Link to="/inscription" className='link-signup'>
            Pas encore inscrit? <span>Clique <i>ici</i></span>
          </Link>
          <button id="buttonLogin" type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;