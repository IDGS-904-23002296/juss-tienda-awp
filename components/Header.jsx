import React from "react";
import reactLogo from '../assets/react.svg'
import appLogo from '/favicon.svg'

const Header = ({ tituloPrincipal }) => {
    return (
        <div className="text-center mb-4">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
                <img src={appLogo} className="logo" alt="prueba logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <h1 className="text-success fw-bold">{tituloPrincipal}</h1>
        </div>
    );
};

export default Header;