import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserListClass from "./components/UserListClass";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const addUser = (newUser) => setUsers([...users, newUser]);

  return (
    <div style={{ padding: 20 }}>
      <h1>User Management System</h1>
      <UserForm onUserAdded={addUser} />
      <UserListClass users={users} />
    </div>
  );
}

export default App;
