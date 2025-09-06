// frontend/src/pages/InventoryMovements.js
import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import './InventoryMovements.css';

const InventoryMovements = () => {
  const { user } = useAuth();
  const [movements, setMovements] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    movementType: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadMovements();
  }, []);

  useEffect(() => {
    filterMovements();
  }, [movements, filters]);

  const loadMovements = async () => {
    try {
      setLoading(true);
      // If user is staff, only show their movements
      // If user is manager or admin, show all movements
      const data = await productService.getAllMovements();
      setMovements(data);
    } catch (error) {
      console.error('Failed to load movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovements = () => {
    let filtered = movements;

    if (filters.movementType) {
      filtered = filtered.filter(m => m.movementType === filters.movementType);
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(m => new Date(m.movementDate) >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day
      filtered = filtered.filter(m => new Date(m.movementDate) <= endDate);
    }

    setFilteredMovements(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="loading">Loading movements...</div>;
  }

  return (
    <div className="movements-page">
      <div className="page-header">
        <h1>Inventory Movements</h1>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Movement Type:</label>
          <select name="movementType" value={filters.movementType} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="In">Stock In</option>
            <option value="Out">Stock Out</option>
            <option value="Adjustment">Adjustment</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Start Date:</label>
          <input 
            type="date" 
            name="startDate" 
            value={filters.startDate} 
            onChange={handleFilterChange} 
          />
        </div>

        <div className="filter-group">
          <label>End Date:</label>
          <input 
            type="date" 
            name="endDate" 
            value={filters.endDate} 
            onChange={handleFilterChange} 
          />
        </div>

        <button onClick={() => setFilters({ movementType: '', startDate: '', endDate: '' })}>
          Clear Filters
        </button>
      </div>

      <div className="movements-list">
        {filteredMovements.length > 0 ? (
          filteredMovements.map(movement => (
            <div key={movement.id} className="movement-item">
              <div className="movement-type">
                <span className={`badge ${movement.movementType.toLowerCase()}`}>
                  {movement.movementType}
                </span>
              </div>
              <div className="movement-details">
                <h4>{movement.product?.name}</h4>
                <p>Quantity Changed: {movement.quantityChanged}</p>
                <p>Reason: {movement.reason}</p>
              </div>
              <div className="movement-meta">
                <span className="user">{movement.user?.username || 'System'}</span>
                <span className="date">
                  {new Date(movement.movementDate).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No movements found</p>
        )}
      </div>
    </div>
  );
};

export default InventoryMovements;