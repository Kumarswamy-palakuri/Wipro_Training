// frontend/src/pages/Reports.js
import React, { useState } from 'react';
import { reportService } from '../services/reportService';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleGenerateReport = async () => {
    try {
      if (reportType === 'inventory') {
        await reportService.downloadInventoryReport();
      } else if (reportType === 'movements') {
        const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
        const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
        await reportService.downloadMovementsReport(null, startDate, endDate);
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports</h1>
      </div>

      <div className="report-controls">
        <div className="form-group">
          <label>Report Type:</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="inventory">Inventory Report</option>
            <option value="movements">Movements Report</option>
          </select>
        </div>

        {reportType === 'movements' && (
          <div className="date-range">
            <div className="form-group">
              <label>Start Date:</label>
              <input 
                type="date" 
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input 
                type="date" 
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>

      <div className="report-info">
        <h2>Available Reports</h2>
        <div className="report-description">
          <h3>Inventory Report</h3>
          <p>Provides a complete overview of all products in inventory, including current stock levels, prices, and low stock alerts.</p>
        </div>
        <div className="report-description">
          <h3>Movements Report</h3>
          <p>Shows all inventory movements (stock in, stock out, adjustments) within a specified date range.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;