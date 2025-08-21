import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
          User List
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400 shadow-lg rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {i + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {user.name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center border border-gray-300 py-3 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
