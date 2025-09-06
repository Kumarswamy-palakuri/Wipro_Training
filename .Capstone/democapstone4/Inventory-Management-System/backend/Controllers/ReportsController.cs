using InventoryManagementSystem.Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/reports")]
    [Authorize(Policy = "RequireManagerOrAdmin")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("logs.csv")]
        public FileContentResult ExportLogs()
        {
            var logs = _context.InventoryMovements.ToList();
            var csv = new StringBuilder();
            csv.AppendLine("Id,ProductId,Change,Reason,Timestamp,UserId");
            foreach (var log in logs)
            {
                csv.AppendLine($"{log.Id},{log.ProductId},{log.Change},{log.Reason},{log.Timestamp},{log.UserId}");
            }
            return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "logs.csv");
        }

        [HttpGet("inventory.csv")]
        public FileContentResult ExportInventory()
        {
            var products = _context.Products.ToList();
            var csv = new StringBuilder();
            csv.AppendLine("Id,Name,Quantity,Price,LowThreshold");
            foreach (var p in products)
            {
                csv.AppendLine($"{p.Id},{p.Name},{p.Quantity},{p.Price},{p.LowThreshold}");
            }
            return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "inventory.csv");
        }
    }
}