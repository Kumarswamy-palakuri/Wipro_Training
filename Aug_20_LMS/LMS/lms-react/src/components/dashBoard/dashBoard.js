import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveHistory from '../leaveHistory/leaveHistory';

const DashBoard = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState(0);
  const [mgrId, setMgrId] = useState(0);
  const [employData, setEmployData] = useState({});
  const [managerData, setManagerData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  const applyLeave = () => {
    navigate("/applyLeave");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("mgrId") !== "null") {
        let mgrId = parseInt(localStorage.getItem("mgrId"));
        const response = await axios.get("https://localhost:7096/api/Employees/" + mgrId);
        setManagerData(response.data);
      }
      let empId = parseInt(localStorage.getItem("empId"));
      const response = await axios.get("https://localhost:7096/api/Employees/" + empId);
      setEmployData(response.data);
    };
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Inline styles
  const styles = {
    dashboardContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    dashboardHeader: {
      background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    headerH1: {
      margin: 0,
      fontWeight: 600,
      fontSize: '1.8rem'
    },
    welcomeText: {
      fontSize: '1.1rem'
    },
    userName: {
      fontWeight: 600,
      color: '#ffd700'
    },
    dashboardContent: {
      display: 'flex',
      padding: '2rem',
      gap: '2rem',
      maxWidth: 1400,
      margin: '0 auto',
      '@media (max-width: 968px)': {
        flexDirection: 'column',
        padding: '1rem'
      }
    },
    sidebar: {
      flex: '0 0 300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      '@media (max-width: 968px)': {
        flex: '0 0 auto',
        width: '100%'
      }
    },
    userProfile: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0 auto 1rem'
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    navBtn: {
      padding: '1rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      background: 'white',
      textAlign: 'left',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    activeNavBtn: {
      background: '#4b6cb7',
      color: 'white',
      boxShadow: '0 4px 6px rgba(75, 108, 183, 0.3)'
    },
    applyLeaveBtn: {
      padding: '1rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(90deg, #38a169 0%, #48bb78 100%)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      boxShadow: '0 4px 6px rgba(72, 187, 120, 0.3)',
      marginTop: 'auto'
    },
    mainContent: {
      flex: 1
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem'
    },
    cardH2: {
      margin: '0 0 1.5rem',
      color: '#2d3748',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.2rem',
      '@media (max-width: 576px)': {
        gridTemplateColumns: '1fr'
      }
    },
    infoItem: {
      padding: '1rem',
      background: '#f7fafc',
      borderRadius: '8px',
      borderLeft: '4px solid #4b6cb7'
    },
    infoLabel: {
      display: 'block',
      fontSize: '0.85rem',
      color: '#718096',
      marginBottom: '0.5rem',
      fontWeight: 500
    },
    infoValue: {
      fontSize: '1.1rem',
      color: '#2d3748',
      fontWeight: 500
    },
    highlight: {
      color: '#38a169',
      fontWeight: 700
    },
    noManager: {
      textAlign: 'center',
      padding: '2rem',
      color: '#718096'
    },
    icon: {
      width: '20px'
    },
    largeIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#cbd5e0'
    }
  };

  // Helper function to handle responsive styles
  const getResponsiveStyle = (baseStyle) => {
    return baseStyle;
  };

  return (
    <div style={getResponsiveStyle(styles.dashboardContainer)}>
      <header style={getResponsiveStyle(styles.dashboardHeader)}>
        <h1 style={getResponsiveStyle(styles.headerH1)}>Employee Dashboard</h1>
        <div style={getResponsiveStyle(styles.welcomeText)}>
          Welcome, <span style={getResponsiveStyle(styles.userName)}>{employData.employName || 'Employee'}</span>
        </div>
      </header>

      <div style={getResponsiveStyle(styles.dashboardContent)}>
        <div style={getResponsiveStyle(styles.sidebar)}>
          <div style={getResponsiveStyle(styles.userProfile)}>
            <div style={getResponsiveStyle(styles.avatar)}>
              {employData.employName ? employData.employName.charAt(0).toUpperCase() : 'E'}
            </div>
            <h3>{employData.employName || 'Employee Name'}</h3>
            <p>ID: {employData.empId || 'N/A'}</p>
            <p>Leaves Available: <span style={getResponsiveStyle(styles.highlight)}>{employData.leaveAvail || 0}</span></p>
          </div>

          <div style={getResponsiveStyle(styles.sidebarNav)}>
            <button 
              style={getResponsiveStyle({
                ...styles.navBtn,
                ...(activeTab === 'profile' ? styles.activeNavBtn : {})
              })}
              onClick={() => setActiveTab('profile')}
            >
              <span style={getResponsiveStyle(styles.icon)}>👤</span> My Profile
            </button>
            <button 
              style={getResponsiveStyle({
                ...styles.navBtn,
                ...(activeTab === 'manager' ? styles.activeNavBtn : {})
              })}
              onClick={() => setActiveTab('manager')}
            >
              <span style={getResponsiveStyle(styles.icon)}>👔</span> Manager Info
            </button>
            <button 
              style={getResponsiveStyle({
                ...styles.navBtn,
                ...(activeTab === 'history' ? styles.activeNavBtn : {})
              })}
              onClick={() => setActiveTab('history')}
            >
              <span style={getResponsiveStyle(styles.icon)}>📋</span> Leave History
            </button>
          </div>

          <button style={getResponsiveStyle(styles.applyLeaveBtn)} onClick={applyLeave}>
            <span style={getResponsiveStyle(styles.icon)}>+</span> Apply for Leave
          </button>
        </div>

        <div style={getResponsiveStyle(styles.mainContent)}>
          {activeTab === 'profile' && (
            <div style={getResponsiveStyle(styles.card)}>
              <h2 style={getResponsiveStyle(styles.cardH2)}>
                <span style={getResponsiveStyle(styles.icon)}>👤</span> My Information
              </h2>
              <div style={getResponsiveStyle(styles.infoGrid)}>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Employee ID</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{employData.empId || 'N/A'}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Full Name</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{employData.employName || 'N/A'}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Manager ID</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{employData.mgrId || 'N/A'}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Leaves Available</span>
                  <div style={getResponsiveStyle({...styles.infoValue, ...styles.highlight})}>{employData.leaveAvail || 0}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Date of Birth</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{formatDate(employData.dateOfBirth)}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Email</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{employData.email || 'N/A'}</div>
                </div>
                <div style={getResponsiveStyle(styles.infoItem)}>
                  <span style={getResponsiveStyle(styles.infoLabel)}>Mobile</span>
                  <div style={getResponsiveStyle(styles.infoValue)}>{employData.mobile || 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manager' && (
            <div style={getResponsiveStyle(styles.card)}>
              <h2 style={getResponsiveStyle(styles.cardH2)}>
                <span style={getResponsiveStyle(styles.icon)}>👔</span> Manager Information
              </h2>
              {managerData.empId ? (
                <div style={getResponsiveStyle(styles.infoGrid)}>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Employee ID</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.empId}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Full Name</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.employName}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Manager ID</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.mgrId || 'N/A'}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Leaves Available</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.leaveAvail}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Date of Birth</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{formatDate(managerData.dateOfBirth)}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Email</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.email}</div>
                  </div>
                  <div style={getResponsiveStyle(styles.infoItem)}>
                    <span style={getResponsiveStyle(styles.infoLabel)}>Mobile</span>
                    <div style={getResponsiveStyle(styles.infoValue)}>{managerData.mobile}</div>
                  </div>
                </div>
              ) : (
                <div style={getResponsiveStyle(styles.noManager)}>
                  <div style={getResponsiveStyle(styles.largeIcon)}>ℹ️</div>
                  <p>No manager assigned</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div style={getResponsiveStyle(styles.card)}>
              <h2 style={getResponsiveStyle(styles.cardH2)}>
                <span style={getResponsiveStyle(styles.icon)}>📋</span> Leave History
              </h2>
              <LeaveHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;