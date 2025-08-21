import axios from 'axios';
import React, {Component, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState('');
  const [data, setData] = useState({
    empId: 0, 
    leaveStartDate: '',
    leaveEndDate: '',
    leaveReason: '',
  });

  const applyLeave = () => {
    let eno = parseInt(localStorage.getItem("empId"));

    axios.post("https://localhost:7096/api/LeaveHistories", {
      empId: eno,
      leaveStartDate: data.leaveStartDate,
      leaveEndDate: data.leaveEndDate,
      leaveReason: data.leaveReason
    }).then(resp => {
      setResult(resp.data);
      console.log(resp.data);
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  }

  const handleChange = event => {
    setData({
      ...data, [event.target.name]: event.target.value  
    });
  }

  // Styling objects
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    heading: {
      textAlign: 'center',
      color: '#2d3748',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '600'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#4a5568',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      '&:focus': {
        outline: 'none',
        borderColor: '#4299e1',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
      }
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      '&:focus': {
        outline: 'none',
        borderColor: '#4299e1',
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
      }
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '10px',
      '&:hover': {
        backgroundColor: '#3182ce'
      }
    },
    result: {
      marginTop: '20px',
      padding: '15px',
      borderRadius: '6px',
      backgroundColor: '#ebf8ff',
      color: '#2b6cb0',
      textAlign: 'center',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Apply for Leave</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Leave Start Date:</label>
        <input 
          type="date" 
          name="leaveStartDate" 
          value={data.leaveStartDate} 
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Leave End Date:</label>
        <input 
          type="date" 
          name="leaveEndDate" 
          value={data.leaveEndDate} 
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Leave Reason:</label>
        <textarea 
          name="leaveReason" 
          value={data.leaveReason} 
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>
      
      <button style={styles.button} onClick={applyLeave}>
        Apply Leave
      </button>
      
      {result && (
        <div style={styles.result}>
          {result}
          <p>Redirecting to dashboard in 5 seconds...</p>
        </div>
      )}
    </div>
  );
}

export default ApplyLeave;