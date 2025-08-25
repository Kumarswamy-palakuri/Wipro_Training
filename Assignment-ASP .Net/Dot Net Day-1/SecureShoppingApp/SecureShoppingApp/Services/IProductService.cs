using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;

namespace SecureShoppingApp.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<bool> CreateProductAsync(ProductViewModel model);
        Task<bool> UpdateProductAsync(int id, ProductViewModel model);
        Task<bool> DeleteProductAsync(int id);
    }
}