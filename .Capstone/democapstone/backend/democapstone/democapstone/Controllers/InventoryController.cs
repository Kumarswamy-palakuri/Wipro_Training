using democapstone.Data;
using democapstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Manager,Staff")] // Any employee [2]
public class InventoryController : ControllerBase
{
    private readonly AppDbContext _db;
    public InventoryController(AppDbContext db) => _db = db;

    // POST /api/inventory/movements
    [HttpPost("movements")]
    public async Task<IActionResult> CreateMovement([FromBody] CreateMovementDto dto)
    {
        var product = await _db.Products.FindAsync(dto.ProductId);
        if (product is null) return NotFound("Product not found.");

        var newQty = product.Quantity + dto.QuantityChange;
        if (newQty < 0) return BadRequest("Resulting quantity cannot be negative.");

        product.Quantity = newQty;

        _db.InventoryMovements.Add(new InventoryMovement
        {
            ProductId = product.Id,
            QuantityChange = dto.QuantityChange,
            Type = dto.Type,
            PerformedBy = User?.Identity?.Name ?? "system"
        });

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // GET /api/inventory/movements?productId=1&days=7
    [HttpGet("movements")]
    public async Task<ActionResult<IEnumerable<InventoryMovement>>> GetMovements([FromQuery] int? productId, [FromQuery] int days = 7)
    {
        var since = DateTime.UtcNow.AddDays(-Math.Abs(days));
        var q = _db.InventoryMovements.AsNoTracking().Where(m => m.CreatedAt >= since);
        if (productId.HasValue) q = q.Where(m => m.ProductId == productId.Value);
        var items = await q.OrderByDescending(m => m.CreatedAt).ToListAsync();
        return Ok(items);
    }
}

public record CreateMovementDto(int ProductId, int QuantityChange, string Type);
