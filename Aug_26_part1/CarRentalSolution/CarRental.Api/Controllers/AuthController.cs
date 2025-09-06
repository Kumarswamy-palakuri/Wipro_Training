using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRental.Api.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CarRental.Api.Controllers;

public record JwtOptions(string Issuer, string Audience, string SigningKey);

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<AppUser> _signInMgr;
    private readonly UserManager<AppUser> _userMgr;
    private readonly JwtOptions _jwt;

    public AuthController(SignInManager<AppUser> signInMgr, UserManager<AppUser> userMgr, IOptionsMonitor<JwtOptions> jwt)
    { _signInMgr = signInMgr; _userMgr = userMgr; _jwt = jwt.CurrentValue; }

    [HttpGet("github")]
    public IActionResult GitHubLogin(string? returnUrl = "/")
    {
        var props = new AuthenticationProperties { RedirectUri = Url.Action(nameof(ExternalLoginCallback), new { returnUrl }) };
        return Challenge(props, "GitHub");
    }

    [HttpGet("/signin-github")]
    public async Task<IActionResult> ExternalLoginCallback(string? returnUrl = "/")
    {
        var info = await _signInMgr.GetExternalLoginInfoAsync();
        if (info == null) return BadRequest("External login info not found");

        var result = await _signInMgr.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
        AppUser user;

        if (!result.Succeeded)
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email) ?? $"{info.ProviderKey}@github.local";
            user = new AppUser { UserName = email, Email = email };
            var created = await _userMgr.CreateAsync(user);
            if (!created.Succeeded) return BadRequest("Cannot create user");
            await _userMgr.AddLoginAsync(user, info);
        }
        else
        {
            user = await _userMgr.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        }

        var token = IssueJwt(user);
        var redirect = $"{returnUrl}?token={token}";
        return Redirect(redirect);
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me() => Ok(new { user = User.Identity?.Name });

    private string IssueJwt(AppUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SigningKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id),
      new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
      new Claim(ClaimTypes.Name, user.UserName ?? "")
    };
        var token = new JwtSecurityToken(_jwt.Issuer, _jwt.Audience, claims, expires: DateTime.UtcNow.AddHours(2), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
