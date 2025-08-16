import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";

const ShowCustomers = () => {
  const [customers, setCustomers] = useState([]);

 
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("https://localhost:7012/api/Customers/show");
      setCustomers(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
useEffect(() => {
  fetchCustomers();
}, []);

  return (
    <div>
       <Menu />
      <h2>All Customers</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Mobile Number</th>
            
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.custId}>
              <td>{c.custId}</td>
              <td>{c.custUserName}</td>
              <td>{c.email}</td>
              <td>{c.city}</td>
              <td>{c.state}</td>
              <td>{c.email}</td>
              <td>{c.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCustomers;
