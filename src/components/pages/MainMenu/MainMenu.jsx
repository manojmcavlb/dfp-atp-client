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
                            Auto Test
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/error-log')}>
                            Error/Event Log
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation2('/health-status')}>
                            Health Status
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/test-settings')}>
                            Test Limits
                        </button>
                    </div>
                    <div className="column">
                        <button className="btn-primary" onClick={() => handleNavigation('/manage-user')}>
                            Manage User
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/calibration')}>
                            Calibration Info.
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/instrument')}>
                            Instrument Settings
                        </button>
                        <button className="btn-primary" onClick={() => handleNavigation('/settings')}>
                            General Settings
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;