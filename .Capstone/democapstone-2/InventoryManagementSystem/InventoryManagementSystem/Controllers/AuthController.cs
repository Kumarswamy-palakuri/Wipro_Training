// backend/Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;
using InventoryManagementSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(IUserService userService, IConfiguration configuration, ApplicationDbContext context)
        {
            _userService = userService;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin model)
        {
            try
            {
                var user = await _userService.Authenticate(model.Username, model.Password);

                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect" });

                // Check if user is approved
                if (!user.IsActive)
                    return BadRequest(new { message = "Your account is pending approval. Please contact administrator." });

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        new Claim(ClaimTypes.Role, user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role,
                    Token = tokenString
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during authentication" });
            }
        }

        //    [HttpPost("register")]
        //    public async Task<IActionResult> Register([FromBody] UserRegistration model)
        //    {
        //        try
        //        {
        //            // Check if username already exists
        //            if (await _context.Users.AnyAsync(x => x.Username == model.Username))
        //                return BadRequest(new { message = "Username already exists" });

        //            // Check if email already exists
        //            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
        //                return BadRequest(new { message = "Email already exists" });

        //            // Create new user with "Pending" status
        //            var user = new User
        //            {
        //                Username = model.Username,
        //                Email = model.Email,
        //                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
        //                Role = "Pending", // New users need approval
        //                IsActive = false, // Inactive until approved
        //                CreatedAt = DateTime.UtcNow
        //            };

        //            _context.Users.Add(user);
        //            await _context.SaveChangesAsync();

        //            // Create approval request
        //            var approval = new UserApproval
        //            {
        //                UserId = user.Id,
        //                RequestedRole = model.RequestedRole,
        //                Status = "Pending",
        //                RequestedAt = DateTime.UtcNow
        //            };

        //            _context.UserApprovals.Add(approval);
        //            await _context.SaveChangesAsync();

        //            return Ok(new { message = "Registration successful. Please wait for admin approval." });
        //        }
        //        catch (Exception ex)
        //        {
        //            return StatusCode(500, new { message = ex.Message });
        //        }
        //    }
        //}
        // backend/Controllers/AuthController.cs
        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] UserRegistration model)
        //{
        //    try
        //    {
        //        // Check if username already exists
        //        if (await _context.Users.AnyAsync(x => x.Username == model.Username))
        //            return BadRequest(new { message = "Username already exists" });

        //        // Check if email already exists
        //        if (await _context.Users.AnyAsync(x => x.Email == model.Email))
        //            return BadRequest(new { message = "Email already exists" });

        //        // Create new user with "Pending" status
        //        var user = new User
        //        {
        //            Username = model.Username,
        //            Email = model.Email,
        //            Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
        //            Role = "Pending", // New users need approval
        //            IsActive = false, // Inactive until approved
        //            CreatedAt = DateTime.UtcNow
        //        };

        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();

        //        // Create approval request
        //        var approval = new UserApproval
        //        {
        //            UserId = user.Id,
        //            RequestedRole = model.RequestedRole,
        //            Status = "Pending",
        //            RequestedAt = DateTime.UtcNow
        //        };

        //        _context.UserApprovals.Add(approval);
        //        await _context.SaveChangesAsync();

        //        return Ok(new { message = "Registration successful. Please wait for admin approval." });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception for debugging
        //        Console.WriteLine($"Registration error: {ex.Message}");
        //        if (ex.InnerException != null)
        //        {
        //            Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
        //        }

        //        return StatusCode(500, new { message = "An error occurred during registration. Please try again." });
        //    }
        //}
        // backend/Controllers/AuthController.cs
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration model)
        {
            try
            {
                // Check if username already exists
                if (await _context.Users.AnyAsync(x => x.Username == model.Username))
                    return BadRequest(new { message = "Username already exists" });

                // Check if email already exists
                if (await _context.Users.AnyAsync(x => x.Email == model.Email))
                    return BadRequest(new { message = "Email already exists" });

                using var transaction = await _context.Database.BeginTransactionAsync();

                try
                {
                    // Create new user with "Pending" status
                    var user = new User
                    {
                        Username = model.Username,
                        Email = model.Email,
                        Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                        Role = "Pending", // New users need approval
                        IsActive = false, // Inactive until approved
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    // Create approval request
                    var approval = new UserApproval
                    {
                        UserId = user.Id,
                        RequestedRole = model.RequestedRole,
                        Status = "Pending",
                        RequestedAt = DateTime.UtcNow
                    };

                    _context.UserApprovals.Add(approval);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return Ok(new { message = "Registration successful. Please wait for admin approval." });
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Registration error: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }

                return StatusCode(500, new { message = "An error occurred during registration. Please try again." });
            }
        }
        public class UserRegistration
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string RequestedRole { get; set; }
        }

        public class UserLogin
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}