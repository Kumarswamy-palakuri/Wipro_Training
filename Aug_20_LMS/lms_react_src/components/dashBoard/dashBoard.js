import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveHistory from '../leaveHistory/leaveHistory';
const DashBoard = () => {

  const navigate = useNavigate();
  const[empId,SetEmpId] = useState(0)
  const[mgrId,SetMgrId] = useState(0)
   const [employData,setEmployData] = useState({})
   const [managerData,setManagerData] = useState({})
  
   const applyLeave = () => {
    navigate("/applyLeave");
   }
   useEffect(() => {
    const fetchData = async () => {
       if (localStorage.getItem("mgrId")!="null")
       {
        let mgrId = parseInt(localStorage.getItem("mgrId"));
         const response = await
        axios.get("https://localhost:7043/api/Employees/" +mgrId);
        setManagerData(response.data)
      }
      let empId = parseInt(localStorage.getItem("empId"));
      const response = await
        axios.get("https://localhost:7043/api/Employees/" +empId);
        setEmployData(response.data)
    }
    fetchData();
  },{})  

  return(
    <div>
      <table border="3" align='center'>
        <tr>
          <th>My Data</th>
          <th>My Manager Data</th>
        </tr>
        <tr>
          <td>
            Employ Id : <b>
            {employData.empId}</b> <br/>
            Employ Name : <b>
              {employData.employName}
            </b> <br/>
            Manager Id : <b>
              {employData.mgrId}
            </b> <br/>
            Leave Avail : <b>
              {employData.leaveAvail}
            </b> <br/>
            Date of Birth : <b>
              {employData.dateOfBirth}
            </b> <br/>
            Email : <b>
              {employData.email}
            </b> <br/>
            Mobile : <b>
              {employData.mobile}
            </b>
          </td>
          <td>
            Employ Id : <b>
            {managerData.empId}</b> <br/>
            Employ Name : <b>
              {managerData.employName}
            </b> <br/>
            Manager Id : <b>
              {managerData.mgrId}
            </b> <br/>
            Leave Avail : <b>
              {managerData.leaveAvail}
            </b> <br/>
            Date of Birth : <b>
              {managerData.dateOfBirth}
            </b> <br/>
            Email : <b>
              {managerData.email}
            </b> <br/>
            Mobile : <b>
              {managerData.mobile}
            </b>
          </td>
        </tr>
        <tr>
          <th colspan="2">
            <LeaveHistory />
          </th>
        </tr>
        <tr>
          <th colspan="2">
            <input type="button" value="Apply Leave" onClick={applyLeave} />
          </th>
        </tr>
      </table>
    </div>
  )
}

export default DashBoard;