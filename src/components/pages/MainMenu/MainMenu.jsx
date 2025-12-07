import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetectedProduct from '../../ui/DetectedProduct/DetectedProduct';
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
            <div className="center">
                <DetectedProduct product={product} handleProductChange={handleProductChange} />
            </div>
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