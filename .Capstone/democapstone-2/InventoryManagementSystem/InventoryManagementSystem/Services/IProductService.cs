// backend/Services/IProductService.cs
using InventoryManagementSystem.Models;

namespace InventoryManagementSystem.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<Product> CreateProduct(Product product);
        Task<Product> UpdateProduct(int id, Product product);
        Task<bool> DeleteProduct(int id);
        Task<bool> UpdateStock(int productId, int quantityChange, string movementType, string reason, int? userId);
        Task<List<InventoryMovement>> GetInventoryMovements(int productId, DateTime? startDate, DateTime? endDate);
        Task<List<Product>> GetLowStockProducts();
        Task<List<InventoryMovement>> GetAllMovements(DateTime? startDate, DateTime? endDate, int? userId);
    }
}