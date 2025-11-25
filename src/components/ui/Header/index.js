function Header() {
    return (
        <header className="topbar">
            <img src={require("../../../assets/logo.svg").default} alt="logo" className="logo-left" />
            <h1 className="title">IoT Eco-Sphere ATP Station</h1>
        </header>
    );
}

export { Header };