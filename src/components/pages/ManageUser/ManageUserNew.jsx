import React from "react";
import { useNavigate } from "react-router-dom";
import { authenticationService, userService } from "../../../services";
import { logout } from "../../../utils";
import "./styles.css";

class ManageUserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    const currentUser = authenticationService.currentUserValue;

    return (
      <div className="manage-user-container">
        <header className="manage-user-header">
          <img
            src="/path-to-your-logo.svg"
            alt="Logo"
            className="manage-user-logo"
          />
          <div className="manage-user-header-info">
            <span>
              User Name: {currentUser.firstName} {currentUser.lastName}
            </span>
            <span>Privilege: {currentUser.role}</span>
          </div>
          <div className="manage-user-header-details">
            <span>SW Version: V1.0</span>
            <span>SW Part No: 79281400-500</span>
            <span>Date & Time: {new Date().toLocaleString()}</span>
          </div>
          <div className="manage-user-header-actions">
            <button className="manage-user-action-button">?</button>
            <button className="manage-user-action-button">Safe Shutdown</button>
          </div>
        </header>
        <div className="manage-user-body">
          <aside className="manage-user-sidebar">
            <button
              className="manage-user-sidebar-button"
              onClick={() => logout(this.props.navigate)}
            >
              Logout
            </button>
            <button className="manage-user-sidebar-button">View Report</button>
            <button className="manage-user-sidebar-button">Auto Test</button>
            <button className="manage-user-sidebar-button">Manual Test</button>
            <button className="manage-user-sidebar-button">Self Test</button>
            <button className="manage-user-sidebar-button">Settings</button>
            <button className="manage-user-sidebar-button">Calib Info</button>
            <button className="manage-user-sidebar-button active">
              Manage User
            </button>
          </aside>
          <main className="manage-user-content">
            <h2>Manage User</h2>
            <div className="manage-user-table-container">
              <table className="manage-user-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Privileges</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>****</td>
                        <td>{user.role}</td>
                        <td>
                          View Reports,Auto Test,Manual Test,Self Test,Settings,Calib
                          Info,Manage User
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <footer className="manage-user-footer">
              <button className="manage-user-footer-button">Add User</button>
              <button className="manage-user-footer-button">Edit User</button>
              <button className="manage-user-footer-button">Delete User</button>
              <button className="manage-user-footer-button">Data Reset</button>
              <button
                className="manage-user-footer-button"
                onClick={() => this.props.navigate(-1)}
              >
                Back
              </button>
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

const ManageUserWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ManageUser {...props} navigate={navigate} />;
};

export { ManageUserWithNavigate as ManageUser };