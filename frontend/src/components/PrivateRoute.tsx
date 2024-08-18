import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/connexion" />;
}

export default PrivateRoute;
