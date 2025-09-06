using democapstone.Data;
using democapstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")] // or [Authorize(Policy="AdminOnly")] [1]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;
    public AdminController(AppDbContext db) => _db = db;

    // GET /api/admin/users
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<object>>> GetUsers()
    {
        var users = await _db.Users.AsNoTracking()
            .Select(u => new { u.Id, u.Username, u.Role })
            .ToListAsync();
        return Ok(users);
    }

    // POST /api/admin/users
    [HttpPost("users")]
    public async Task<ActionResult<object>> CreateUser([FromBody] CreateUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password) || string.IsNullOrWhiteSpace(dto.Role))
            return BadRequest("Username, Password, and Role are required.");
        var exists = await _db.Users.AnyAsync(u => u.Username == dto.Username);
        if (exists) return Conflict("Username already exists.");

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, new { user.Id, user.Username, user.Role });
    }

    // PUT /api/admin/users/{id}/role
    [HttpPut("users/{id:int}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateRoleDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        user.Role = dto.Role;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/admin/users/{id}
    [HttpDelete("users/{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // Analytics
    // GET /api/admin/analytics/stock-summary
    [HttpGet("analytics/stock-summary")]
    public async Task<ActionResult<object>> StockSummary()
    {
        var totalSkus = await _db.Products.CountAsync();
        var totalUnits = await _db.Products.SumAsync(p => (int?)p.Quantity) ?? 0;
        var inventoryValue = await _db.Products.SumAsync(p => (decimal?)(p.Price * p.Quantity)) ?? 0m;
        return Ok(new { totalSkus, totalUnits, inventoryValue });
    }

    // GET /api/admin/analytics/movements?days=30
    [HttpGet("analytics/movements")]
    public async Task<ActionResult<IEnumerable<object>>> MovementTrends([FromQuery] int days = 30)
    {
        var since = DateTime.UtcNow.AddDays(-Math.Abs(days));
        var data = await _db.InventoryMovements.AsNoTracking()
            .Where(m => m.CreatedAt >= since)
            .GroupBy(m => new { Day = m.CreatedAt.Date, m.Type })
            .Select(g => new { g.Key.Day, g.Key.Type, Quantity = g.Sum(x => x.QuantityChange) })
            .OrderBy(x => x.Day)
            .ToListAsync();
        return Ok(data);
    }
}

public record CreateUserDto(string Username, string Password, string Role);
public record UpdateRoleDto(string Role);
