using InventoryManagementSystem.Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/alerts")]
    [Authorize(Policy = "RequireManagerOrAdmin")]
    public class AlertsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlertsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("low-stock")]
        public IActionResult GetLowStock()
        {
            var lowStock = _context.Products.Where(p => p.Quantity < p.LowThreshold).ToList();
            return Ok(lowStock);
        }
    }
}