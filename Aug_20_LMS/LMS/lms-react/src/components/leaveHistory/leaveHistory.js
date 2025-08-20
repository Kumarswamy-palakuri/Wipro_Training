import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';

const LeaveHistory = () => {

   const [lh,SetLeaveHistory] = useState([])
  
   
    useEffect(() => {
      const fetchData = async () => {
        let eid = localStorage.getItem("empId");
        const response = await
          axios.get("https://localhost:7043/api/LeaveHistories/leaveHistory/"+eid);
          SetLeaveHistory(response.data)
      }
      fetchData();
    },[])  
    return (
      <div>
        <table border="3" align="center">
          <tr>
            <th>Leave Id</th>
            <th>Employee Id</th>
            <th>Leave Start Date</th>
            <th>Leave End Date</th>
            <th>No Of Days</th>
            <th>Leave Status</th>
            <th>Leave Reason</th>
            <th>Manager Comments</th>
          </tr>
          {lh.map((item) =>
          <tr>
            <td>{item.leaveId}</td>
             <td>{item.empId}</td>
              <td>{item.leaveStartDate}</td>
             <td>{item.leaveEndDate}</td>
             <td>{item.noOfDays}</td>
             <td>{item.leaveStatus}</td>
              <td>{item.leaveReason}</td>
              <td>{item.managerComments}</td>
              
               </tr>
        )}
        </table>
      </div>
    )

}

export default LeaveHistory;