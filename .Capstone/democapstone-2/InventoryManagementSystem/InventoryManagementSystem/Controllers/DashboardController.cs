// backend/Controllers/DashboardController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagementSystem.Services;
using InventoryManagementSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProductService _productService;

        public DashboardController(ApplicationDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            try
            {
                var totalProducts = await _context.Products.CountAsync();
                var totalUsers = await _context.Users.CountAsync();
                var lowStockProducts = await _productService.GetLowStockProducts();
                var totalInventoryValue = await _context.Products.SumAsync(p => p.Price * p.Quantity);

                var recentMovements = await _context.InventoryMovements
                    .Include(m => m.Product)
                    .Include(m => m.User)
                    .OrderByDescending(m => m.MovementDate)
                    .Take(10)
                    .ToListAsync();

                return Ok(new
                {
                    TotalProducts = totalProducts,
                    TotalUsers = totalUsers,
                    LowStockCount = lowStockProducts.Count,
                    TotalInventoryValue = totalInventoryValue,
                    RecentMovements = recentMovements
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("manager-stats")]
        public async Task<IActionResult> GetManagerStats()
        {
            try
            {
                var inactiveUsers = await _context.Users
                    .Where(u => u.UpdatedAt < DateTime.UtcNow.AddDays(-30) || u.UpdatedAt == null)
                    .ToListAsync();

                var staffMovements = await _context.InventoryMovements
                    .Include(m => m.Product)
                    .Include(m => m.User)
                    .Where(m => m.UserId != null && m.User.Role == "Staff")
                    .OrderByDescending(m => m.MovementDate)
                    .Take(20)
                    .ToListAsync();

                return Ok(new
                {
                    InactiveUsers = inactiveUsers,
                    StaffMovements = staffMovements
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}