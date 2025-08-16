// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Menu from "./Menu";

// const ShowCustomers = () => {
//   const [customers, setCustomers] = useState([]);

 
//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get("https://localhost:7012/api/Customers/show");
//       setCustomers(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
// useEffect(() => {
//   fetchCustomers();
// }, []);

//   return (
//     <div>
//        <Menu />
//       <h2>All Customers</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>UserName</th>
//             <th>Email</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Email</th>
//             <th>Mobile Number</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map(c => (
//             <tr key={c.custId}>
//               <td>{c.custId}</td>
//               <td>{c.custUserName}</td>
//               <td>{c.email}</td>
//               <td>{c.city}</td>
//               <td>{c.state}</td>
//               <td>{c.email}</td>
//               <td>{c.mobileNo}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShowCustomers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";

const ShowCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("https://localhost:7012/api/Customers/show");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customers-container">
      {/* Embedded CSS Styles */}
      <style>
        {`
          .customers-container {
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          h2 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-top: 0;
          }
          
          .customers-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          
          .customers-table th {
            background-color: #3498db;
            color: white;
            text-align: left;
            padding: 12px 15px;
          }
          
          .customers-table td {
            padding: 10px 15px;
            border-bottom: 1px solid #ecf0f1;
          }
          
          .customers-table tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          
          .customers-table tr:hover {
            background-color: #e3f2fd;
            transition: background-color 0.2s;
          }
          
          .customers-table th:first-child,
          .customers-table td:first-child {
            padding-left: 20px;
          }
        `}
      </style>

      <Menu />
      <h2>Customer Directory</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.custId}>
              <td>{c.custId}</td>
              <td>{c.custUserName}</td>
              <td>{c.email}</td>
              <td>{c.city}</td>
              <td>{c.state}</td>
              <td>{c.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCustomers;