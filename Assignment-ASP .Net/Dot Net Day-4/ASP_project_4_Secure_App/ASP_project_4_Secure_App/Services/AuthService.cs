using ASP_project_4_Secure_App.DTOs;
using ASP_project_4_Secure_App.Models;
using ASP_project_4_Secure_App.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ASP_project_4_Secure_App.Security;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ASP_project_4_Secure_App.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly PasswordHasher _hasher;
        private readonly ILogger<AuthService> _logger;
        private readonly IConfiguration _cfg;
        private readonly UserService _users;

        public AuthService(AppDbContext db, PasswordHasher hasher, ILogger<AuthService> logger, IConfiguration cfg, UserService users)
        {
            _db = db;
            _hasher = hasher;
            _logger = logger;
            _cfg = cfg;
            _users = users;
        }

        public async Task<(bool ok, string? token, UserReadDto? user)> LoginAsync(UserLoginDto dto, string? ip, string? userAgent, CancellationToken ct)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == dto.Email, ct);

            if (user is null || !_hasher.Verify(dto.Password, user.PasswordHash, user.PasswordSalt))
            {
                _logger.LogInformation("Auth failed for {Email} from {IP}", dto.Email, ip ?? "unknown");
                return (false, null, null);
            }

            var token = GenerateJwt(user);
            _logger.LogInformation("Auth success for {UserId} from {IP}", user.Id, ip ?? "unknown");

            return (true, token, _users.ToRead(user));
        }

        public string GenerateJwt(User user)
        {
            var rawKey = Environment.GetEnvironmentVariable("JWT_SIGNING_KEY")
                        ?? _cfg["Security:Jwt:SigningKey"];
            if (string.IsNullOrWhiteSpace(rawKey))
                throw new InvalidOperationException("JWT signing key not configured");

            byte[] keyBytes;
            try { keyBytes = Convert.FromBase64String(rawKey); }
            catch { keyBytes = Encoding.UTF8.GetBytes(rawKey); }

            var issuer = _cfg["Security:Jwt:Issuer"] ?? "secureapp";
            var audience = _cfg["Security:Jwt:Audience"] ?? "secureapp-clients";
            var ttlMinutes = _cfg.GetValue<int?>("Security:Jwt:TokenMinutes") ?? 60;

            var handler = new JwtSecurityTokenHandler();
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);
            var now = DateTime.UtcNow;

            var token = handler.CreateJwtSecurityToken(
                issuer: issuer,
                audience: audience,
                subject: identity,
                notBefore: now,
                expires: now.AddMinutes(ttlMinutes),
                issuedAt: now,
                signingCredentials: credentials
            );

            return handler.WriteToken(token);
        }
    }
}
