import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch users when page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/users/${editId}`, { name });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/users", { name });
      }
      setName("");
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (id, currentName) => {
    setName(currentName);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2c3e50" }}>🎯 User Management System</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleAddOrUpdate}
          style={{
            padding: "8px 15px",
            backgroundColor: editId ? "#e67e22" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#34495e", color: "white" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                style={{
                  textAlign: "center",
                  backgroundColor: index % 2 === 0 ? "#ecf0f1" : "white",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.id}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleEdit(user.id, user.name)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2980b9",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#c0392b",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{ textAlign: "center", padding: "15px", color: "#7f8c8d" }}
              >
                🚀 No users added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
