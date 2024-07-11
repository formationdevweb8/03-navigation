// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { initBrevoTracker } from '../lib/trackerbrevo';
const Home: React.FC = () => {
    useEffect(() => {
        initBrevoTracker();
    }, []);
    return (
        <div className=""><p className="xz">Bienvenue sur la page d'accueil !</p></div>
    );
}

export default Home;