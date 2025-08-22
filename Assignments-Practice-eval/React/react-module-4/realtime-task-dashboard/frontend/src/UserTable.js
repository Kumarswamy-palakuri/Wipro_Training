import React, { useState } from 'react';

function UserTable({ users, onUpdate, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    onUpdate(id, editName);
    setEditId(null);
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              {editId === user.id ? (
                <input 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editId === user.id ? (
                <>
                  <button onClick={() => handleUpdate(user.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => onDelete(user.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
