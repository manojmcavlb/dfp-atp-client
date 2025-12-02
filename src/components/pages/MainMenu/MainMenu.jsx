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
                    <button className="btn-secondary" onClick={() => handleNavigation('/detected-product?product=remote-head')}>
                        PRODUCTION
                    </button>
                    <button className="btn-secondary" onClick={() => handleNavigation('/test-suite')}>
                        MANUAL
                    </button>
                </div>
                <div className="button-container">
                    <button className="btn-secondary" onClick={() => handleNavigation('/test-settings')}>
                        TEST SETTINGS
                    </button>
                    <button className="btn-secondary" onClick={() => handleNavigation('/calibration')}>
                        CALIBRATION INFO.
                    </button>
                </div>
                <div className="button-container">
                    <button className="btn-secondary" onClick={() => handleNavigation('/instrument')}>
                        INSTRUMENT SETTINGS
                    </button>
                    <button className="btn-secondary" onClick={() => handleNavigation('/manage-user')}>
                        MANAGE USER
                    </button>
                </div>
                <div className="button-container">
                    <button className="btn-secondary" onClick={() => handleNavigation('/atp-health-status')}>
                        ATP HEALTH STATUS
                    </button>
                    <button className="btn-secondary" onClick={() => handleNavigation('/error-log')}>
                        ERROR/EVENT LOG
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;