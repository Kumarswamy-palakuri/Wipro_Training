// // import React, { useState } from "react";
// // import axios from "axios";
// // import Menu from "./Menu";

// // const Searchcusbyun = () => {
// //   const [username, setUsername] = useState("");
// //   const [customer, setCustomer] = useState(null);
// //   const [message, setMessage] = useState("");

// //   const handleSearch = async () => {
// //     try {
// //       const res = await axios.get(`https://localhost:7012/api/Customers/search/username/${username}`);
// //       setCustomer(res.data);
// //       setMessage("");
// //     } catch {
// //       setMessage("Customer not found");
// //       setCustomer(null);
// //     }
// //   };

// //   return (
// //     <div>
// //        <Menu />
// //       <h2>Search Customer by Username</h2>
// //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
// //       <button onClick={handleSearch}>Search</button>
// //       {message && <p>{message}</p>}
// //       {customer && (
// //         <div>
// //                     <p>ID: {customer.custId}</p>
// //           <p>Name: {customer.custName}</p>
// //           <p>Username: {customer.custUserName}</p>
// //           <p>Password: {customer.custPassword}</p>
// //           <p>City: {customer.city}</p>
// //           <p>State: {customer.state}</p>
// //           <p>Email: {customer.email}</p>
// //           <p>Mobile No: {customer.mobileNo}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Searchcusbyun;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Menu from "./Menu";
// import { useParams } from "react-router-dom";

// const Searchcusbyun = () => {
//   const { username } = useParams(); // get username from route param
//   const [customer, setCustomer] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (username) {
//       handleSearch(username);
//     }
//   }, [username]);

//   const handleSearch = async (uname) => {
//     try {
//       const res = await axios.get(
//         `https://localhost:7012/api/Customers/search/username/${uname}`
//       );
//       setCustomer(res.data);
//       setMessage("");
//     } catch {
//       setMessage("Customer not found");
//       setCustomer(null);
//     }
//   };

//   return (
//     <div>
//       <Menu />
//       <h2>Search Customer by Username</h2>
//       {message && <p>{message}</p>}
//       {customer && (
//         <div>
//           <p>ID: {customer.custId}</p>
//           <p>Name: {customer.custName}</p>
//           <p>Username: {customer.custUserName}</p>
//           {/* Hide password for security */}
//           <p>City: {customer.city}</p>
//           <p>State: {customer.state}</p>
//           <p>Email: {customer.email}</p>
//           <p>Mobile No: {customer.mobileNo}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Searchcusbyun;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useParams } from "react-router-dom";

const Searchcusbyun = () => {
  const { username } = useParams(); // get username from route param
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (username) {
      handleSearch(username);
    }
  }, [username]);

  const handleSearch = async (uname) => {
    try {
      const res = await axios.get(
        `https://localhost:7012/api/Customers/search/username/${uname}`
      );
      setCustomer(res.data);
      setMessage("");
    } catch {
      setMessage("Customer not found");
      setCustomer(null);
    }
  };

  return (
    <div>
      <Menu />
      <h2>Search Customer by Username</h2>
      {message && <p>{message}</p>}
      {customer && (
        <div>
          <p>ID: {customer.custId}</p>
          <p>Name: {customer.custName}</p>
          <p>Username: {customer.custUserName}</p>
          {/* Hide password for security */}
          <p>City: {customer.city}</p>
          <p>State: {customer.state}</p>
          <p>Email: {customer.email}</p>
          <p>Mobile No: {customer.mobileNo}</p>
        </div>
      )}
    </div>
  );
};

export default Searchcusbyun;
