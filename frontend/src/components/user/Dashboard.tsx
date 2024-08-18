import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

/**
 * Dashboard component for his homepage
 * @returns {JSX.Element}
 */
const Dashboard: React.FC = () => {
    const { user } = useUser();
    const {logout} = useAuth();
    return (
        <div className='dashboard'>
            <p> Bienvenue dans ton tableau de bord <span className="info-name">{user?.firstname}</span> !</p>
            <button id='buttonLogout' onClick={logout}>Déconnexion</button>
        </div>
    );
};

export default Dashboard;