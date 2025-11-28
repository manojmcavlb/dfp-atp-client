import { logout } from "../../../utils/auth-header";
import './styles.css'

function HeaderMainMenu() {
    return (
        <header className="header">
            <img src={require("../../../assets/logo.svg").default} alt="Delta Flight Products" className="logo" />
            <div className="title">IoT Eco-Sphere ATP Station</div>
            <div className="user-info">
                <span className="user-role">Admin / Tech</span>
                <button className="logout-button" onClick={logout}>Logout</button>  
                </div>
        </header>
    );
}

export { HeaderMainMenu };