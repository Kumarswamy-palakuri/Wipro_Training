using democapstone.Models;
using democapstone.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace democapstone.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtTokenService _jwt;

    public AuthController(IUserService userService, IJwtTokenService jwt)
    {
        _userService = userService;
        _jwt = jwt;
    }

    // POST /api/auth/login
    [HttpPost("login")]
    [AllowAnonymous]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
    {
        var user = _userService.Validate(request.Username, request.Password);
        if (user is null) return Unauthorized(new { message = "Invalid credentials" });

        var token = _jwt.Generate(user);
        return Ok(new LoginResponse { Token = token });
    }
}
