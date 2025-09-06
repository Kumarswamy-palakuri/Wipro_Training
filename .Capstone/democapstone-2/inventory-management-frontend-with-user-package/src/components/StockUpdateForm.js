// frontend/src/components/StockUpdateForm.js
import React, { useState } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import './StockUpdateForm.css';

const StockUpdateForm = ({ product, onCancel, onSuccess }) => {
  const [movementType, setMovementType] = useState('In');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate quantity change based on movement type
      const quantityChange = movementType === 'In' ? quantity : -quantity;
      
      await productService.updateStock(
        product.id, 
        quantityChange, 
        movementType, 
        reason
      );
      
      if (onSuccess) {
        onSuccess();
      }
      
      onCancel();
    } catch (error) {
      console.error('Failed to update stock:', error);
      alert('Failed to update stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update Stock: {product.name}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movement Type</label>
            <select 
              value={movementType} 
              onChange={(e) => setMovementType(e.target.value)}
              required
            >
              <option value="In">Stock In (Add)</option>
              <option value="Out">Stock Out (Remove)</option>
              <option value="Adjustment">Adjustment</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for stock movement..."
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockUpdateForm;