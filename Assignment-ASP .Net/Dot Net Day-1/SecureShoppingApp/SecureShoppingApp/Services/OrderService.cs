using Microsoft.EntityFrameworkCore;
using SecureShoppingApp.Data;
using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;

namespace SecureShoppingApp.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<OrderService> _logger;

        public OrderService(ApplicationDbContext context, ILogger<OrderService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> CreateOrderAsync(string userId, OrderViewModel model)
        {
            try
            {
                var product = await _context.Products.FindAsync(model.ProductId);
                if (product == null) return false;

                var order = new Order
                {
                    UserId = userId,
                    ProductId = model.ProductId,
                    Quantity = model.Quantity,
                    TotalAmount = product.Price * model.Quantity
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Order created for user {UserId}, product {ProductId}", userId, model.ProductId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order for user {UserId}", userId);
                return false;
            }
        }

        public async Task<IEnumerable<Order>> GetUserOrdersAsync(string userId)
        {
            return await _context.Orders
                .Include(o => o.Product)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Product)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}