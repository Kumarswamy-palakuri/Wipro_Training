// backend/Services/ProductService.cs
using InventoryManagementSystem.Data;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> CreateProduct(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product> UpdateProduct(int id, Product product)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return null;

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Quantity = product.Quantity;
            existingProduct.LowStockThreshold = product.LowStockThreshold;
            existingProduct.Category = product.Category;
            existingProduct.Sku = product.Sku;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStock(int productId, int quantityChange, string movementType, string reason, int? userId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return false;

            // Update product quantity
            product.Quantity += quantityChange;
            product.UpdatedAt = DateTime.UtcNow;

            // Record inventory movement
            var movement = new InventoryMovement
            {
                ProductId = productId,
                QuantityChanged = quantityChange,
                MovementType = movementType,
                Reason = reason,
                UserId = userId,
                MovementDate = DateTime.UtcNow
            };

            _context.InventoryMovements.Add(movement);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<InventoryMovement>> GetInventoryMovements(int productId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.InventoryMovements
                .Include(m => m.Product)
                .Include(m => m.User)
                .Where(m => m.ProductId == productId);

            if (startDate.HasValue)
                query = query.Where(m => m.MovementDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(m => m.MovementDate <= endDate.Value);

            return await query.OrderByDescending(m => m.MovementDate).ToListAsync();
        }

        public async Task<List<InventoryMovement>> GetAllMovements(DateTime? startDate, DateTime? endDate, int? userId)
        {
            var query = _context.InventoryMovements
                .Include(m => m.Product)
                .Include(m => m.User)
                .AsQueryable();

            if (startDate.HasValue)
                query = query.Where(m => m.MovementDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(m => m.MovementDate <= endDate.Value);

            if (userId.HasValue)
                query = query.Where(m => m.UserId == userId.Value);

            return await query.OrderByDescending(m => m.MovementDate).ToListAsync();
        }

        public async Task<List<Product>> GetLowStockProducts()
        {
            return await _context.Products
                .Where(p => p.Quantity <= p.LowStockThreshold)
                .ToListAsync();
        }
    }
}