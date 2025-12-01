import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const MainMenu = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="main-menu">
            <main className="content">
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/detected-product?product=remote-head')}>
                        Production
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/test-suite')}>
                        Manual
                    </button>
                </div>
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/test-settings')}>
                        Test Settings
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/calibration')}>
                        Calibration Info.
                    </button>
                </div>
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/instrument')}>
                        Instrument Settings
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/manage-user')}>
                        Manage User
                    </button>
                </div>
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/atp-health-status')}>
                        ATP Health Status
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;