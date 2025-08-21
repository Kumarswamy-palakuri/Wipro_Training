import { useState } from "react";
import axios from "axios";

function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await axios.post("http://localhost:5000/users", { name });
    onUserAdded(res.data);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button type="submit" style={{ marginLeft: 8 }}>Add User</button>
    </form>
  );
}

export default UserForm;
