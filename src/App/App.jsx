import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { history, Role } from '../utils';
import { authenticationService } from '../services';
import { PrivateRoute } from '../routes';
import { HomePage } from '../components/pages/HomePage/HomePage';
import { ManageUser } from '../components/pages/ManageUser';
// import EmpListing from '../_components/Employee/EmpListing';
import { LoginPage } from '../components/pages/LoginPage';
import Drivers from '../components/pages/Drivers/index';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    <div style={{ textAlign: 'center', padding: '20px', fontSize: '28px', fontWeight: 'bold' }}>
                        IoT Eco-Sphere ATP Station
                    </div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark " style={{backgroundColor: '#11182F' }}>
                            <div className="navbar-nav">
                                <div>
                                    <Link to="/" className="navbar-brand bg-light">
                                        <img
                                            src={require('../assets/logo.svg').default}
                                            alt=""
                                        />
                                    </Link>
                                </div>

                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/drivers" className="nav-item nav-link">Drivers</Link>}
                                {isAdmin && <Link to="/manageUser" className="nav-item nav-link">Manage User</Link>}
                                {/* {isAdmin && <Link to="/employee" className="nav-item nav-link">Employee</Link>} */}
                                {isAdmin && <Link to="/controlIndicationPanel" className="nav-item nav-link">Control & Indication Panel</Link>}
                                {isAdmin && <Link to="/calibration" className="nav-item nav-link">Calibration Screen</Link>}
                                {isAdmin && <Link to="/productionTesting" className="nav-item nav-link">Production Testing</Link>}
                                {isAdmin && <Link to="/singleTest" className="nav-item nav-link">Single Test Screen</Link>}
                                {isAdmin && <Link to="/dataVisualization" className="nav-item nav-link">Data Visualization</Link>}
                                {isAdmin && <Link to="/errorHandling" className="nav-item nav-link">Error Handling & Reporting</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/drivers" roles={[Role.Admin]} component={Drivers} />
                                    <PrivateRoute path="/manageUser" roles={[Role.Admin]} component={ManageUser} />
                                    {/* <PrivateRoute path="/employee" roles={[Role.Admin]} component={EmpListing} /> */}
                                    <PrivateRoute path="/controlIndicationPanel" roles={[Role.Admin, Role.User]} component={ManageUser} />
                                    <PrivateRoute path="/calibration" roles={[Role.User]} component={ManageUser} />
                                    <PrivateRoute path="/productionTesting" roles={[Role.Admin]} component={ManageUser} />
                                    <PrivateRoute path="/singleTest" roles={[Role.Admin]} component={ManageUser} />
                                    <PrivateRoute path="/dataVisualization" roles={[Role.Admin]} component={ManageUser} />
                                    <PrivateRoute path="/errorHandling" roles={[Role.Admin]} component={ManageUser} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 