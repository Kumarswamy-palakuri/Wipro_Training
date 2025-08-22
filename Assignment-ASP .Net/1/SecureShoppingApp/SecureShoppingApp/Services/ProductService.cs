using Microsoft.EntityFrameworkCore;
using SecureShoppingApp.Data;
using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;

namespace SecureShoppingApp.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductService> _logger;

        public ProductService(ApplicationDbContext context, ILogger<ProductService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<bool> CreateProductAsync(ProductViewModel model)
        {
            try
            {
                var product = new Product
                {
                    Name = model.Name,
                    Description = model.Description,
                    Price = model.Price
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Product {ProductName} created successfully", model.Name);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating product {ProductName}", model.Name);
                return false;
            }
        }

        public async Task<bool> UpdateProductAsync(int id, ProductViewModel model)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null) return false;

                product.Name = model.Name;
                product.Description = model.Description;
                product.Price = model.Price;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Product {ProductId} updated successfully", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product {ProductId}", id);
                return false;
            }
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null) return false;

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Product {ProductId} deleted successfully", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting product {ProductId}", id);
                return false;
            }
        }
    }
}