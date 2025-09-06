// backend/Controllers/NotificationController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagementSystem.Services;
using InventoryManagementSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Authorize(Roles = "Manager,Admin")]
    [ApiController]
    [Route("api/notifications")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStockNotifications()
        {
            var lowStockProducts = await _context.Products
                .Where(p => p.Quantity <= p.LowStockThreshold)
                .ToListAsync();

            return Ok(lowStockProducts);
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToNotifications([FromBody] NotificationSubscription subscription)
        {
            // In a real application, you would save this to a database
            // and use it to send push notifications
            return Ok(new { message = "Subscribed to notifications" });
        }
    }

    public class NotificationSubscription
    {
        public string Endpoint { get; set; }
        public string Auth { get; set; }
        public string P256dh { get; set; }
    }
}