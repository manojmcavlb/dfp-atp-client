import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../../assets/logo.png';

const MainMenu = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="main-menu">
            <header className="header">
                <img src={logo} alt="Delta Flight Products" className="logo" />
                <div className="title">IoT Eco-Sphere ATP Station</div>
                <div className="user-info">Admin / Tech</div>
            </header>
            <main className="content">
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/detected-product/remote-head')}>
                        Remote Head
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/detected-product/iot-gateway')}>
                        IoT Gateway
                    </button>
                </div>
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/settings')}>
                        Test Settings
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/calibration')}>
                        Calibration Info.
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;