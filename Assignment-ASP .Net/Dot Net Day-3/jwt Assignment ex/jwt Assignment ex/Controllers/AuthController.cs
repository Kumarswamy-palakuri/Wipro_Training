using jwt_Assignment_ex.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureApp.Data;
using SecureApp.Models;
using SecureApp.Services;

namespace SecureApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwt;

        public AuthController(ApplicationDbContext context, IJwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (_context.Users.Any(u => u.UserName == request.UserName))
                return BadRequest("User already exists");

            PasswordHasher.CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

            var user = new User { UserName = request.UserName, PasswordHash = hash, PasswordSalt = salt };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == request.Role);
            if (role != null)
            {
                _context.UserRoles.Add(new UserRole { UserId = user.Id, RoleId = role.Id });
                await _context.SaveChangesAsync();
            }

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.role)
                .FirstOrDefaultAsync(u => u.UserName == request.UserName);

            if (user == null || !PasswordHasher.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("Invalid credentials");

            var roles = user.UserRoles.Select(ur => ur.role.Name).ToList();
            var token = _jwt.GenerateToken(user, roles);

            return Ok(new { Token = token });
        }
    }
}