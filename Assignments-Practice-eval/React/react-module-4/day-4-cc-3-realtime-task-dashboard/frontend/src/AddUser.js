import React, { useState } from 'react';

function AddUser({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName('');
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;
