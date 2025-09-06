using InventoryManagementSystem.Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/logs")]
    [Authorize(Policy = "RequireManagerOrAdmin")]
    public class LogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LogsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetLogs()
        {
            return Ok(_context.InventoryMovements.ToList());
        }
    }
}