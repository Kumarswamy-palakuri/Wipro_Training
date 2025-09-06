using democapstone.Data;
using democapstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    private const int LowStockThreshold = 5;
    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    [Authorize] // Any employee [1]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        => Ok(await _db.Products.AsNoTracking().ToListAsync());

    [HttpGet("{id:int}")]
    [Authorize] // Any employee [1]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _db.Products.FindAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    // New: low-stock monitoring (Manager/Admin)
    [HttpGet("low-stock")]
    [Authorize(Roles = "Admin,Manager")] // [1]
    public async Task<ActionResult<IEnumerable<Product>>> LowStock([FromQuery] int threshold = LowStockThreshold)
    {
        var items = await _db.Products.AsNoTracking()
            .Where(p => p.Quantity <= threshold)
            .OrderBy(p => p.Quantity)
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")] // [1]
    public async Task<ActionResult<Product>> Create(Product model)
    {
        _db.Products.Add(model);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin,Manager")] // [1]
    public async Task<IActionResult> Update(int id, Product update)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        var change = update.Quantity - product.Quantity;

        if (!string.IsNullOrWhiteSpace(update.Name)) product.Name = update.Name;
        if (update.Quantity >= 0) product.Quantity = update.Quantity;
        if (update.Price >= 0) product.Price = update.Price;

        if (change != 0)
        {
            _db.InventoryMovements.Add(new InventoryMovement
            {
                ProductId = product.Id,
                QuantityChange = change,
                Type = change > 0 ? "In" : "Out",
                PerformedBy = User?.Identity?.Name ?? "system"
            });

            if (product.Quantity <= LowStockThreshold)
            {
                Console.WriteLine($"[LOW-STOCK] {product.Name} qty={product.Quantity}");
            }
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")] // [1]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();
        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
