import React from "react";
import "./styles.css";

const userData = [
  {
    username: "Admin",
    password: "****",
    role: "Administrator",
    privileges: "View Reports,Auto Test,Manual Test,Self Test,Settings,Calib Info,Manage User",
  },
  {
    username: "Preethi",
    password: "****",
    role: "Operator",
    privileges: "View Reports,Auto Test,Manual Test,Self Test",
  },
  {
    username: "Raj",
    password: "****",
    role: "Operator",
    privileges: "View Reports,Auto Test,Manual Test,Self Test",
  },
  {
    username: "Ajay",
    password: "****",
    role: "Administrator",
    privileges: "View Reports,Auto Test,Manual Test,Self Test,Settings,Calib Info,Manage User",
  },
];

function ManageUser() {
  return (
    <div className="page-bg">
      <main className="manage-user-wrap">
        <h2 className="page-title">Manage User</h2>
        <div className="table-container">
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
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.privileges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="action-buttons">
            <button>Add User</button>
            <button>Edit User</button>
            <button>Delete User</button>
            <button>Data Reset</button>
            <button>Back</button>
        </div>
      </main>
    </div>
  );
}

export { ManageUser };