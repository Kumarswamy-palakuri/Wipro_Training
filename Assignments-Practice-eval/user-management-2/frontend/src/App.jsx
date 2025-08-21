import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => setRefresh(!refresh);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          User Management System
        </h1>

        {/* Add User Form */}
        <AddUser onUserAdded={handleUserAdded} />

        {/* User List Table */}
        <UserList refresh={refresh} />
      </div>
    </div>
  );
};

export default App;
