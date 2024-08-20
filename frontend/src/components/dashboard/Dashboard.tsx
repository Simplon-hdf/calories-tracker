import React from "react";
import Header from "../layout/Header";
import Program from "../common/Program";
import { Link } from "react-router-dom";

/**
 * Dashboard component for his homepage
 * @returns {JSX.Element}
 */
const Dashboard: React.FC = (): JSX.Element => {
    return (
        <div className="container">
            <Header />
            <div className='dashboard'>
                <div className="title-main">
                    Tableau de bord
                </div>
                <Link to="/objectives">
                    <Program title="Objectif" paragraph="Définir votre objectif" />
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;