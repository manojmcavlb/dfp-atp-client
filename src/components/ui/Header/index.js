import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services";
import { logout } from "../../../utils/auth-header";
import './styles.css'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = authenticationService.currentUserValue;

    return (
        <header className="header">
            <img src={require("../../../assets/logo.svg").default} alt="Delta Flight Products" className="logo" />
            <div className="title">IoT Eco-Sphere ATP Station</div>
            {currentUser && (
                <div className="user-info">
                    <span className="user-role">Admin / Tech</span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                        {location.pathname !== "/main-menu" && (
                            <button className="secondary-btn" onClick={() => navigate("/main-menu")}>
                                Main Menu
                            </button>
                        )}
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export { Header };