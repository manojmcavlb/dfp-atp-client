import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const MainMenu = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState('remote-head');

    const handleNavigation = (path) => {
        navigate(path);
    };
    const handleNavigation2 = (path) => {
        navigate(path);
    };

    const handleProductChange = (event) => {
        setProduct(event.target.value);
    };

    return (
        <div className="main-menu">
            <header className="status-bar">
                <div className="status-item">
                    <label htmlFor="product-select">Detected Product:</label>
                    <select id="product-select" className="select" value={product} onChange={handleProductChange}>
                        <option value="remote-head">Remote Head</option>
                        <option value="iot-gateway">IoT Gateway</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </header>
            <main className="content">
                <div className="two-column-layout">
                    <div className="column">
                        <button className="btn-secondary" onClick={() => handleNavigation2(`/auto-test?product=${product}`)}>
                            AUTO TEST
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation('/manual-test')}>
                            MANUAL TEST
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation2('/health-status')}>
                            HEALTH STATUS
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation('/test-settings')}>
                            TEST SETTINGS
                        </button>
                    </div>
                    <div className="column">
                        <button className="btn-secondary" onClick={() => handleNavigation('/manage-user')}>
                            MANAGE USER
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation('/calibration')}>
                            CALIBRATION INFO.
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation('/instrument')}>
                            INSTRUMENT SETTINGS
                        </button>
                        <button className="btn-secondary" onClick={() => handleNavigation('/error-log')}>
                            ERROR/EVENT LOG
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;