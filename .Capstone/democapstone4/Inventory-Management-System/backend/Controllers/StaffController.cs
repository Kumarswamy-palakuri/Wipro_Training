using InventoryManagementSystem.Backend.Data;
using InventoryManagementSystem.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/staff")]
    [Authorize(Policy = "RequireStaff")]
    public class StaffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("movements")]
        public IActionResult AddMovement([FromBody] MovementDto dto)
        {
            var product = _context.Products.Find(dto.ProductId);
            if (product == null) return NotFound("Product not found");

            product.Quantity += dto.Change;
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var movement = new InventoryMovement { ProductId = dto.ProductId, Change = dto.Change, Reason = dto.Reason, UserId = userId };
            _context.InventoryMovements.Add(movement);
            _context.SaveChanges();
            return Ok();
        }
    }

    public class MovementDto
    {
        public int ProductId { get; set; }
        public int Change { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}