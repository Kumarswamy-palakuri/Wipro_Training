import React, { useState } from "react";

const CustomerDetails = ({ customer }) => {
  // Sample customer data for demonstration
  const demoCustomer = {
    custId: "CUST-78942",
    custName: "Alexandra Chen",
    custUserName: "alexchen",
    email: "alex.chen@example.com",
    mobileNo: "+1 (555) 123-4567",
    city: "San Francisco",
    state: "California",
    joinDate: "2023-03-15",
    status: "Active",
    lastActive: "2024-01-20",
    loyaltyPoints: 1245
  };
  
  // Use demo data if no customer prop is provided
  const customerData = customer || demoCustomer;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>
          {customerData.custName.split(" ").map(n => n[0]).join("")}
        </div>
        <div style={styles.headerInfo}>
          <h1 style={styles.name}>{customerData.custName}</h1>
          <div style={styles.metaContainer}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>ID:</span>
              <span>{customerData.custId}</span>
            </div>
            {/* <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Status:</span>
              <span style={styles.statusActive}>{customerData.status}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Member Since:</span>
              <span>{customerData.joinDate}</span>
            </div> */}
          </div>
        </div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Personal Information</div>
          <div style={styles.divider}></div>
        </div>
        
        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>👤</div>
            <div>
              <div style={styles.detailLabel}>Username</div>
              <div style={styles.detailValue}>{customerData.custUserName}</div>
            </div>
          </div>
          
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>✉️</div>
            <div>
              <div style={styles.detailLabel}>Email</div>
              <div style={styles.detailValue}>{customerData.email}</div>
            </div>
          </div>
          
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>📱</div>
            <div>
              <div style={styles.detailLabel}>Mobile</div>
              <div style={styles.detailValue}>{customerData.mobileNo}</div>
            </div>
          </div>
          
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>📍</div>
            <div>
              <div style={styles.detailLabel}>Location</div>
              <div style={styles.detailValue}>
                {customerData.city}, {customerData.state}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Activity & Engagement</div>
          <div style={styles.divider}></div>
        </div>
        
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔄</div>
            <div>
              <div style={styles.statValue}>24</div>
              <div style={styles.statLabel}>Active Sessions</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏱️</div>
            <div>
              <div style={styles.statValue}>{customerData.lastActive}</div>
              <div style={styles.statLabel}>Last Active</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⭐</div>
            <div>
              <div style={styles.statValue}>{customerData.loyaltyPoints}</div>
              <div style={styles.statLabel}>Loyalty Points</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// Enhanced styling with a modern color scheme
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333"
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#4a6cf7",
    color: "white",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
    fontWeight: "bold",
    marginRight: "25px",
    flexShrink: 0
  },
  headerInfo: {
    flex: 1
  },
  name: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#2c3e50"
  },
  metaContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "10px"
  },
  metaItem: {
    backgroundColor: "#f5f8ff",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center"
  },
  metaLabel: {
    fontWeight: "600",
    marginRight: "8px",
    color: "#4a6cf7"
  },
  statusActive: {
    color: "#10b981",
    fontWeight: "600"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: "25px",
    overflow: "hidden",
    padding: "25px"
  },
  sectionHeader: {
    marginBottom: "25px"
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "15px"
  },
  divider: {
    height: "3px",
    background: "linear-gradient(90deg, #4a6cf7, #82a0ff)",
    borderRadius: "10px",
    width: "60px"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  detailCard: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9faff",
    borderRadius: "12px",
    borderLeft: "3px solid #4a6cf7",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
  },
  detailIcon: {
    fontSize: "24px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#e6eeff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
    flexShrink: 0,
    color: "#4a6cf7"
  },
  detailLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "5px"
  },
  detailValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50"
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9faff",
    borderRadius: "12px",
    borderLeft: "3px solid #82a0ff",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    minWidth: "250px"
  },
  statIcon: {
    fontSize: "24px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#e6eeff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
    flexShrink: 0,
    color: "#4a6cf7"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#4a6cf7",
    lineHeight: "1.2"
  },
  statLabel: {
    fontSize: "15px",
    color: "#6c757d"
  }
};

export default CustomerDetails;