// frontend/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from '../store/slices/productsSlice';
import { useAuth } from '../contexts/AuthContext';
import ProductForm from '../components/ProductForm';
import StockUpdateForm from '../components/StockUpdateForm';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(state => state.products);
  const { user } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatingStock, setUpdatingStock] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (productData) => {
    dispatch(addProduct(productData));
    setShowForm(false);
  };

  const handleEditProduct = (productData) => {
    dispatch(updateProduct({ id: editingProduct.id, product: productData }));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category?.toLowerCase().includes(filter.toLowerCase()) ||
    product.sku?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        {(user.role === 'Admin' || user.role === 'Manager') && (
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Product
          </button>
        )}
      </div>

      <div className="products-filter">
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-sku">{product.sku}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-quantity">
                Quantity: <span className={product.quantity <= product.lowStockThreshold ? 'low-stock' : ''}>
                  {product.quantity}
                </span>
              </p>
              <p className="product-price">${product.price}</p>
            </div>
            
            <div className="product-actions">
              <button 
                className="btn-secondary"
                onClick={() => setUpdatingStock(product)}
              >
                Update Stock
              </button>
              
              {(user.role === 'Admin' || user.role === 'Manager') && (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {updatingStock && (
        <StockUpdateForm
          product={updatingStock}
          onCancel={() => setUpdatingStock(null)}
        />
      )}
    </div>
  );
};

export default Products;