import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services";
import { logout } from "../../../utils/auth-header";
import "../../../assets/styles/main.css";
import './styles.css'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = authenticationService.currentUserValue;

    return (
        <header className="header">
            <img src={require("../../../assets/logo.svg").default} alt="Delta Flight Products"
                className="header-logo" />
            <div className="header-title">IoT Eco-Sphere ATP Station</div>
            {currentUser && (
                <div className="user-info">
                    <span className="user-role">Admin / Tech</span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                        {location.pathname !== "/main-menu" && (
                            <button className="btn-primary" onClick={() => navigate("/main-menu")}>
                                MAIN MENU
                            </button>
                        )}
                        <button className="btn-primary" onClick={logout}>LOG OUT</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export { Header };