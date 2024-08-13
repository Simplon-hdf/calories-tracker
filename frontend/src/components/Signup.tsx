import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', { email, password, firstname, lastname });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="firstname"
      />
      <input
        type="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="lastname"
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;