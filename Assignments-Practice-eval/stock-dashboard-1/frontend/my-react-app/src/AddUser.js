import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null); // track which user is being edited

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleAddOrUpdateUser = () => {
    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    if (editId) {
      // Update user
      axios.put(`http://localhost:5000/api/users/${editId}`, { name })
        .then(res => {
          setName('');
          setEditId(null);
          fetchUsers();
        })
        .catch(err => console.error(err));
    } else {
      // Add new user
      axios.post('http://localhost:5000/api/users', { name })
        .then(res => {
          setName('');
          fetchUsers();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (user) => {
    setName(user.name);   // fill input box
    setEditId(user.id);   // mark which user is being edited
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => fetchUsers())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Stock Dashboard</h1>

      {/* Add / Edit User */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '10px', width: '250px', marginRight: '10px' }}
        />
        <button
          onClick={handleAddOrUpdateUser}
          style={{
            padding: '10px 20px',
            backgroundColor: editId ? '#FFA500' : '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {editId ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* Users Table */}
      <table
        style={{
          width: '60%',
          margin: '0 auto',
          borderCollapse: 'collapse',
          textAlign: 'left'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddUser;
