using democapstone.Data;
using democapstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly AppDbContext _db;
    public RegistrationController(AppDbContext db) => _db = db;

    // POST /api/registration
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest("Username and Password are required.");

        // Reject if username already exists or pending request exists
        var existsUser = await _db.Users.AnyAsync(u => u.Username == dto.Username);
        var existsPending = await _db.PendingUsers.AnyAsync(p => p.Username == dto.Username && p.Status == "Pending");
        if (existsUser || existsPending) return Conflict("Username already exists or is pending approval.");

        var pending = new PendingUser
        {
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RequestedRole = string.IsNullOrWhiteSpace(dto.RequestedRole) ? "Staff" : dto.RequestedRole,
            Status = "Pending"
        };
        _db.PendingUsers.Add(pending);
        await _db.SaveChangesAsync();
        return Accepted(new { message = "Registration submitted for approval." });
    }

    public record RegisterDto(string Username, string Password, string? RequestedRole);
}
