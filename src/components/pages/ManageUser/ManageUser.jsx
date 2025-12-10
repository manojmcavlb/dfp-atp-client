import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";

const initialUserData = [
  {
    id: 1,
    username: "Super Admin",
    password: "****",
    role: "Super Administrator",
    privileges: "Auto Test, Self Test, View Reports, Calib Info., Test Limits, Health Status, Manage User, Error Log",
  },
  {
    id: 2,
    username: "Admin",
    password: "****",
    role: "Administrator",
    privileges: "Auto Test, Self Test, View Reports, Calib Info., Test Limits, Health Status, Manage User, Error Log",
  },
  {
    id: 3,
    username: "Ajay",
    password: "****",
    role: "Administrator",
    privileges: "Auto Test, Self Test, View Reports, Calib Info., Test Limits, Health Status, Manage User, Error Log",
  },
  {
    id: 4,
    username: "Preethi",
    password: "****",
    role: "Operator",
    privileges: "Auto Test, Self Test, View Reports, Health Status, Error Log",
  },
  {
    id: 5,
    username: "Raj",
    password: "****",
    role: "Operator",
    privileges: "Auto Test, Self Test, View Reports, Health Status, Error Log",
  },
];

function ManageUser() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUserData);

  useEffect(() => {
    const results = initialUserData.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm]);

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action here
    console.log("Deleting user:", userToDelete.username);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleDone = () => {
    navigate(-1); 
  };

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="page-title">Manage Accounts</h2>
          <button className="btn-primary" onClick={handleDone}>Done</button>
        </div>
        <div className="table-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <button className="btn-primary" onClick={handleAddUser}>Add New User</button>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <table className="page-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className="action-btns">
                    <button className="btn-primary" onClick={() => handleEditUser(user.id)}>Edit</button>
                    <button
                      className="btn-primary"
                      disabled={user.username === "Super Admin"}
                      onClick={() => handleDeleteClick(user)}
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

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Delete Account</h2>
            <p>
              Are you sure you want to DELETE the user account{" "}
              <strong>{userToDelete.username}</strong>?
            </p>
            <p>
              <strong>This action cannot be undone.</strong>
            </p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleCancelDelete}>
                No
              </button>
              <button className="btn-primary" onClick={handleConfirmDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ManageUser };