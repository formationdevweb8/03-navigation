// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png'

type Props = {
    onChangeSideBar: (title: string) => void,
};

const Sidebar: React.FC<Props> = ({ onChangeSideBar }) => {
    const location = useLocation();
    const [linkSelected, setLinkSelected] = useState('');

    function onChangeSideBarCall(value: string) {
        return onChangeSideBar(value);
    }

    return (
        <aside className="sidebar">
            <div className="">
                <h2 className=""><img src={logo} width="62" height="110" alt="Logo tâche"></img></h2>
                <ul className="mt-4">
                    <li><Link to="/" className={location.pathname === "/" ? "linkSelected" : ""} onClick={() => onChangeSideBarCall('Accueil')}>Accueil</Link></li>
                    <li><Link to="/tasks" className={location.pathname === "/tasks" ? "linkSelected" : ""} onClick={() => onChangeSideBarCall('Tâches')}>Tâches</Link></li>
                    <li><Link to="/about" className={location.pathname === "/about" ? "linkSelected" : ""} onClick={() => onChangeSideBarCall('A propos')}>A propos</Link></li>

                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;