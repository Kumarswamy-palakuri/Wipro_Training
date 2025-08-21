import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeShow = () => {
   const navigate = useNavigate();
 const [employs,setEmployData] = useState([])

  const show = (eid,mid) => {
      localStorage.setItem("empId",eid);
      localStorage.setItem("mgrId",mid);
      navigate("dashBoard")
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await
        axios.get("https://localhost:7096/api/Employees");
        setEmployData(response.data)
    }
    fetchData();
  },[])  

  // Styling objects
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    table: {
      borderCollapse: 'collapse',
      margin: '0 auto',
      width: '90%',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)'
    },
    tableHeader: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 15px',
      textAlign: 'left'
    },
    tableCell: {
      padding: '12px 15px',
      borderBottom: '1px solid #ddd'
    },
    tableRow: {
      transition: 'background-color 0.3s ease'
    },
    tableRowHover: {
      backgroundColor: '#f5f5f5'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    }
  }

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Employee Id</th>
            <th style={styles.tableHeader}>Employee Name</th>
            <th style={styles.tableHeader}>Manager Id</th>
            <th style={styles.tableHeader}>Leave Avail</th>
            <th style={styles.tableHeader}>Date Of Birth</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Mobile</th>
            <th style={styles.tableHeader}>Show Info</th>
          </tr>
        </thead>
        <tbody>
          {employs.map((item) =>
          <tr 
            key={item.empId}
            style={{
              ...styles.tableRow,
              ...(hoveredRow === item.empId && styles.tableRowHover)
            }}
            onMouseEnter={() => setHoveredRow(item.empId)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <td style={styles.tableCell}>{item.empId}</td>
            <td style={styles.tableCell}>{item.employName}</td>
            <td style={styles.tableCell}>{item.mgrId}</td>
            <td style={styles.tableCell}>{item.leaveAvail}</td>
            <td style={styles.tableCell}>{item.dateOfBirth}</td>
            <td style={styles.tableCell}>{item.email}</td>
            <td style={styles.tableCell}>{item.mobile}</td>
            <td style={styles.tableCell}>
              <button
                style={{
                  ...styles.button,
                  ...(hoveredButton === item.empId && styles.buttonHover)
                }}
                onMouseEnter={() => setHoveredButton(item.empId)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => show(item.empId, item.mgrId)}
              >
                Show
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeShow;