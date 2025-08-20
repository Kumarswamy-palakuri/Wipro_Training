import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeShow = () => {
   const navigate = useNavigate();
 const [employs,setEmployData] = useState([])

  const show = (eid,mid) => {
      // alert(eid);
      // alert(mid);
      localStorage.setItem("empId",eid);
      localStorage.setItem("mgrId",mid);
      navigate("dashBoard")
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await
        axios.get("https://localhost:7043/api/Employees");
        setEmployData(response.data)
    }
    fetchData();
  },[])  
  return (
    <div>
      <table border="3" align="center">
        <tr>
          <th>Employee Id</th>
          <th>Employee Name</th>
          <th>Manager Id</th>
          <th>Leave Avail</th>
          <th>Date Of Birth</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Show Info</th>
        </tr>
        {employs.map((item) =>
        <tr>
          <td>{item.empId}</td>
           <td>{item.employName}</td>
            <td>{item.mgrId}</td>
           <td>{item.leaveAvail}</td>
           <td>{item.dateOfBirth}</td>
           <td>{item.email}</td>
            <td>{item.mobile}</td>
          <td>
            <td>
      <input 
        type="button" 
        value="Show" 
        onClick={() => show(item.empId, item.mgrId)} 
      />
    </td>
          </td>
        </tr>
      )}
      </table>
    </div>
  )
}

export default EmployeeShow;