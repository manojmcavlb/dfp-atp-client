import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const MainMenu = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState('remote-head');
    const firstButtonRef = useRef(null);

    useEffect(() => {
        if (firstButtonRef.current) {
            firstButtonRef.current.focus();
        }
    }, []);

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
            <main className="content">
                <h2 className="card-title">Main Menu</h2>
                <div className="two-column-layout">
                    <div className="column">
                        <button
                            ref={firstButtonRef}
                            className="btn-primary"
                            onClick={() => handleNavigation2(`/auto-test?product=${product}`)}
                            autoFocus
                        >
                            AUTO TEST
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/error-log')}>
                            ERROR/EVENT LOG
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation2('/health-status')}>
                            HEALTH STATUS
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/test-settings')}>
                            TEST LIMITS
                        </button>
                    </div>
                    <div className="column">
                        <button className="btn-primary" onClick={() => handleNavigation('/manage-user')}>
                            MANAGE USER
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/calibration')}>
                            CALIBRATION INFO.
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/instrument')}>
                            INSTRUMENT SETTINGS
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/settings')}>
                            GENERAL SETTINGS
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;