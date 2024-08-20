import React from "react";
import { ProgramProps } from "../../interfaces/types";
import { Link } from "react-router-dom";

/**
 *  component for Dashboard
 * @returns {JSX.Element}
 */
const Program: React.FC<ProgramProps> = ({ title , paragraph }): JSX.Element => {
    return (
        <div className="program-card">
            <div className="program-card-header">{title}</div>
            <div className="program-info">
                <p className="program-title">Envie de se lancer ?</p>
                <p>{paragraph}</p>
            </div>
            <div className="program-card-footer">
                <p className="program-tag">Mettre un logo ici </p>
                <Link to="/objective">
                    <button type="button" className="program-action" aria-label="Commencer l' objectif'">C'est parti !</button>
                </Link>
            </div>
        </div>
    );
};

export default Program;