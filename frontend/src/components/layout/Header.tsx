import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
    const { logout } = useAuth();
    const userFirstname = localStorage.getItem('userFirstName')

    return (
        <header className="header">
            <div className="header-start">
                <img src="/images/code-barres.png" alt="logo" width={24} height={24} />
                <h1>Calories Tracker</h1>
            </div>
            <div className="header-end">
                <nav>
                    <Link to='#'>Consommation</Link>
                    <Link to='#'>Objectifs</Link>
                    <Link to='#'>Infos personnelles</Link>
                </nav>
                <Link to='/profil'>
                    <span className="info-name">{userFirstname}</span>
                </Link>
                <button id='buttonLogout' onClick={logout}>Déconnexion</button>
            </div>
        </header>
    )
}

export default Header