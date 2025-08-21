import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await axios.post("http://localhost:5000/users", { name });
      setName("");
      onUserAdded(); // Refresh user list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
