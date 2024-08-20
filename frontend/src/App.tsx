import React from 'react';
import Signup from './components/authentification/Signup';
import "../public/css/styles.css";
import Login from './components/authentification/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inscription" element={<Signup />} />
            <Route path="/accueil" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>}
            />
            {/* <Route path="/objectifs" element={<Objectives />}></Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
