// src/components/Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC<any> = (props) => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Accueil avec useLocation";
            case "/tasks":
                return "Tâches avec useLocation";
            case "/about":
                return "About avec useLocation";
            default:
                return "Page   le nom par defaut";
        }
    };
    /*<h1> {getTitle()} </h1>*/
    return (
        <header className="bg-gray-800 p-4"><div className="container mx-auto text-white">
            {props.title}
        </div>


        </header>
    );
}

export default Header;