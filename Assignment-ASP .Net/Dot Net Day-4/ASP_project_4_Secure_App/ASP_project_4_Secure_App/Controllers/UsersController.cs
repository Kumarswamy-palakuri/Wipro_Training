using ASP_project_4_Secure_App.DTOs;
using ASP_project_4_Secure_App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASP_project_4_Secure_App.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _users;
        private readonly AuthService _auth;

        public UsersController(UserService users, AuthService auth)
        {
            _users = users;
            _auth = auth;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Create(UserCreateDto dto, CancellationToken ct)
        {
            var user = await _users.CreateAsync(dto, ct);
            var token = _auth.GenerateJwt(user);

            return CreatedAtAction(nameof(GetMe), new { id = user.Id }, new
            {
                token,
                user = _users.ToRead(user)
            });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(UserLoginDto dto, CancellationToken ct)
        {
            var (ok, token, user) = await _auth.LoginAsync(
                dto,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers["User-Agent"].ToString(),
                ct);

            if (!ok || user == null)
                return Unauthorized();

            return Ok(new { token, user });
        }

        [HttpGet("me")]
        [Authorize]
        public ActionResult GetMe()
        {
            return Ok(new
            {
                userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value,
                email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
            });
        }
    }
}
