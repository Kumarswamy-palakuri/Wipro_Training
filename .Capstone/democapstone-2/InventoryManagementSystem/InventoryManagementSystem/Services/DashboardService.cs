// backend/Services/DashboardService.cs
using InventoryManagementSystem.Data;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services
{
    public interface IDashboardService
    {
        Task<DashboardStats> GetDashboardStatsAsync();
        Task<ManagerDashboardStats> GetManagerDashboardStatsAsync();
        Task<List<InventoryMovement>> GetRecentMovementsAsync(int count = 10);
        Task<List<Product>> GetLowStockProductsAsync();
        Task<List<User>> GetInactiveUsersAsync();
        Task<List<InventoryMovement>> GetStaffMovementsAsync(int count = 20);
    }

    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardStats> GetDashboardStatsAsync()
        {
            var totalProducts = await _context.Products.CountAsync();
            var totalUsers = await _context.Users.CountAsync();
            var lowStockProducts = await GetLowStockProductsAsync();
            var totalInventoryValue = await _context.Products.SumAsync(p => p.Price * p.Quantity);
            var recentMovements = await GetRecentMovementsAsync(10);

            return new DashboardStats
            {
                TotalProducts = totalProducts,
                TotalUsers = totalUsers,
                LowStockCount = lowStockProducts.Count,
                TotalInventoryValue = totalInventoryValue,
                RecentMovements = recentMovements
            };
        }

        public async Task<ManagerDashboardStats> GetManagerDashboardStatsAsync()
        {
            var inactiveUsers = await GetInactiveUsersAsync();
            var staffMovements = await GetStaffMovementsAsync(20);

            return new ManagerDashboardStats
            {
                InactiveUsers = inactiveUsers,
                StaffMovements = staffMovements
            };
        }

        public async Task<List<InventoryMovement>> GetRecentMovementsAsync(int count = 10)
        {
            return await _context.InventoryMovements
                .Include(m => m.Product)
                .Include(m => m.User)
                .OrderByDescending(m => m.MovementDate)
                .Take(count)
                .ToListAsync();
        }

        public async Task<List<Product>> GetLowStockProductsAsync()
        {
            return await _context.Products
                .Where(p => p.Quantity <= p.LowStockThreshold)
                .ToListAsync();
        }

        public async Task<List<User>> GetInactiveUsersAsync()
        {
            // Users who haven't been active for 30 days
            var cutoffDate = DateTime.UtcNow.AddDays(-30);
            return await _context.Users
                .Where(u => (u.UpdatedAt < cutoffDate || u.UpdatedAt == null) && u.IsActive)
                .ToListAsync();
        }

        public async Task<List<InventoryMovement>> GetStaffMovementsAsync(int count = 20)
        {
            return await _context.InventoryMovements
                .Include(m => m.Product)
                .Include(m => m.User)
                .Where(m => m.UserId != null && m.User.Role == "Staff")
                .OrderByDescending(m => m.MovementDate)
                .Take(count)
                .ToListAsync();
        }
    }

    public class DashboardStats
    {
        public int TotalProducts { get; set; }
        public int TotalUsers { get; set; }
        public int LowStockCount { get; set; }
        public decimal TotalInventoryValue { get; set; }
        public List<InventoryMovement> RecentMovements { get; set; } = new List<InventoryMovement>();
    }

    public class ManagerDashboardStats
    {
        public List<User> InactiveUsers { get; set; } = new List<User>();
        public List<InventoryMovement> StaffMovements { get; set; } = new List<InventoryMovement>();
    }
}