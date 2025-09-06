using democapstone.Data;
using democapstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin,Manager")] // approvers [6]
public class ApprovalsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ApprovalsController(AppDbContext db) => _db = db;

    // GET /api/approvals/pending
    [HttpGet("pending")]
    public async Task<ActionResult<IEnumerable<object>>> GetPending()
    {
        var items = await _db.PendingUsers.AsNoTracking()
            .Where(p => p.Status == "Pending")
            .OrderBy(p => p.CreatedAt)
            .Select(p => new { p.Id, p.Username, p.RequestedRole, p.CreatedAt })
            .ToListAsync();
        return Ok(items);
    }

    // POST /api/approvals/{id}/approve
    [HttpPost("{id:int}/approve")]
    public async Task<IActionResult> Approve(int id, [FromBody] ApproveDto dto)
    {
        var req = await _db.PendingUsers.FirstOrDefaultAsync(p => p.Id == id && p.Status == "Pending");
        if (req is null) return NotFound();

        // If a user with this username was created in the meantime, fail fast
        var existsUser = await _db.Users.AnyAsync(u => u.Username == req.Username);
        if (existsUser) return Conflict("User already exists.");

        var role = string.IsNullOrWhiteSpace(dto.Role) ? req.RequestedRole : dto.Role;

        var user = new User
        {
            Username = req.Username,
            PasswordHash = req.PasswordHash, // already hashed
            Role = role
        };
        _db.Users.Add(user);

        req.Status = "Approved";
        req.Reviewer = User?.Identity?.Name ?? "system";
        req.ReviewedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // POST /api/approvals/{id}/reject
    [HttpPost("{id:int}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        var req = await _db.PendingUsers.FirstOrDefaultAsync(p => p.Id == id && p.Status == "Pending");
        if (req is null) return NotFound();

        req.Status = "Rejected";
        req.Reviewer = User?.Identity?.Name ?? "system";
        req.ReviewedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    public record ApproveDto(string? Role);
}
