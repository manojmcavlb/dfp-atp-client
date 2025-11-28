import React from "react";
import "./styles.css";

const initialUserData = [
  {
    id: 1,
    username: "Super Admin",
    password: "****",
    role: "Super Administrator",
    privileges: "View Reports,Add/Edit Device, Add/Edit Test Suite,Execute Test SuiteSettings,Calib InfoTest Settings,Manage User",
  },
  {
    id: 2,
    username: "Admin",
    password: "****",
    role: "Administrator",
    privileges: "View Reports,Add/Edit Device, Add/Edit Test Suite,Execute Test SuiteSettings,Calib InfoTest Settings,Manage User",
  },
  {
    id: 3,
    username: "Ajay",
    password: "****",
    role: "Administrator",
    privileges: "View Reports,Add/Edit Device, Add/Edit Test Suite,Execute Test SuiteSettings,Calib InfoTest Settings,Manage User",
  },
  {
    id: 4,
    username: "Preethi",
    password: "****",
    role: "Operator",
    privileges: "View Reports,Add/Edit Device, Add/Edit Test Suite",
  },
  {
    id: 5,
    username: "Raj",
    password: "****",
    role: "Operator",
    privileges: "View Reports,Add/Edit Device, Add/Edit Test Suite",
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
                <th>Actions&nbsp;&nbsp;
                  <button className="grid-btn">Add</button></th>
              </tr>
            </thead>
            <tbody>
              {initialUserData.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.privileges}</td>
                  <td className="action-cell">
                    <button className="grid-btn">Edit</button>
                    <button
                      className="grid-btn"
                      disabled={user.username === "Super Admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export { ManageUser };