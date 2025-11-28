import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { HeaderMainMenu } from "../../ui/HeaderMainMenu";

const MainMenu = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="main-menu">
            <HeaderMainMenu />
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
                    <button className="menu-button" onClick={() => handleNavigation('/test-settings')}>
                        Test Settings
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/calibration')}>
                        Calibration Info.
                    </button>
                </div>
                <div className="button-container">
                    <button className="menu-button" onClick={() => handleNavigation('/instrument-settings')}>
                        Instrument Settings
                    </button>
                    <button className="menu-button" onClick={() => handleNavigation('/manage-user')}>
                        ManageUser
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;