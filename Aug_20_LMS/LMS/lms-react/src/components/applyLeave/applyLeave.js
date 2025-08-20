import axios from 'axios';
import React, {Component, useState} from 'react';
import { useNavigate } from 'react-router-dom';
const ApplyLeave = () => {
  const navigate = useNavigate();
  const [result,SetResult] = useState('');
  const [data, setData] = useState({
        empId : 0, 
        leaveStartDate : '',
        leaveEndDate : '',
        leaveReason : '',
    })

    const applyLeave = () => {
      let eno = parseInt(localStorage.getItem("empId"))

      axios.post("https://localhost:7043/api/LeaveHistories",{
        empId : eno,
        leaveStartDate : data.leaveStartDate,
        leaveEndDate : data.leaveEndDate,
        leaveReason : data.leaveReason
      }).then(resp => {
          // alert(resp.data);
          SetResult(resp.data);
          console.log(resp.data);
        })

       setTimeout(() => {
      // console.log("This runs after 5 seconds!");
          navigate("/dashboard");
    }, 5000);
    }

    const handleChange = event => {
        setData({
            ...data,[event.target.name] : event.target.value  
        })
    }

     return (
    <div>
      
          
            <label>Leave Start Date : </label>
            <input type="date" name="leaveStartDate" 
                value={data.leaveStartDate} onChange={handleChange} /> <br/><br/> 
            <label>Leave End Date : </label>
            <input type="date" name="leaveEndDate" 
                value={data.leaveEndDate} onChange={handleChange} /> <br/><br/> 

            <label>Leave Reason : </label>
            <input type="text" name="leaveReason" 
                value={data.leaveReason} onChange={handleChange} /> <br/><br/> 
            <input type="button" value="Apply Leave" onClick={applyLeave} /> 
            <hr/>
            {result}

    </div>
  )
}

export default ApplyLeave;