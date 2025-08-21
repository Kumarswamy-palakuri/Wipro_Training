import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LeaveHistory = () => {
  const [lh, setLeaveHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let eid = localStorage.getItem("empId");
        const response = await axios.get(`https://localhost:7096/api/LeaveHistories/leaveHistory/${eid}`);
        setLeaveHistory(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load leave history. Please try again later.");
        console.error("Error fetching leave history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status badge styling
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { backgroundColor: '#4caf50', color: 'white' };
      case 'pending':
        return { backgroundColor: '#ff9800', color: 'white' };
      case 'rejected':
        return { backgroundColor: '#f44336', color: 'white' };
      default:
        return { backgroundColor: '#9e9e9e', color: 'white' };
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Leave History</h2>
      
      {isLoading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading leave history...</p>
        </div>
      ) : error ? (
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>⚠️</div>
          <p style={styles.errorText}>{error}</p>
          <button 
            style={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : lh.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📋</div>
          <h3>No Leave Records Found</h3>
          <p>You haven't applied for any leaves yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Leave ID</th>
                <th style={styles.tableHeader}>Start Date</th>
                <th style={styles.tableHeader}>End Date</th>
                <th style={styles.tableHeader}>Days</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Reason</th>
                <th style={styles.tableHeader}>Manager Comments</th>
              </tr>
            </thead>
            <tbody>
              {lh.map((item) => (
                <tr key={item.leaveId} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.leaveId}</td>
                  <td style={styles.tableCell}>{formatDate(item.leaveStartDate)}</td>
                  <td style={styles.tableCell}>{formatDate(item.leaveEndDate)}</td>
                  <td style={{...styles.tableCell, textAlign: 'center'}}>{item.noOfDays}</td>
                  <td style={styles.tableCell}>
                    <span style={{...styles.statusBadge, ...getStatusStyle(item.leaveStatus)}}>
                      {item.leaveStatus || 'N/A'}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{item.leaveReason || '-'}</td>
                  <td style={styles.tableCell}>{item.managerComments || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    // minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
  },
  tableContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
    transition: 'background-color 0.2s',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#2c3e50',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
    textAlign: 'center',
    minWidth: '80px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#7f8c8d',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#ffebee',
    borderRadius: '8px',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  errorText: {
    color: '#c62828',
    marginBottom: '20px',
    fontSize: '16px',
  },
  retryButton: {
    padding: '10px 24px',
    backgroundColor: '#c62828',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: '#7f8c8d',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default LeaveHistory;