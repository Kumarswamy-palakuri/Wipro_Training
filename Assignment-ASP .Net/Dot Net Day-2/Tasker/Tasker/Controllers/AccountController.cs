using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tasker.Data;
using Tasker.Models;
using System.Security.Claims;

namespace Tasker.Controllers;

public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register() => View();

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        // Server-side validation beyond DataAnnotations could go here

        var user = new ApplicationUser { UserName = model.Email.Trim(), Email = model.Email.Trim() };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "User");

            // Optional: add default claims, e.g., allow edit own tasks
            await _userManager.AddClaimAsync(user, new Claim("permission", "CanEditTask"));

            await _signInManager.SignInAsync(user, isPersistent: false);
            return RedirectToAction("Dashboard", "Home");
        }

        foreach (var error in result.Errors)
            ModelState.AddModelError("", error.Description);

        return View(model);
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View(new LoginViewModel());
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        if (!ModelState.IsValid) return View(model);

        var user = await _userManager.FindByEmailAsync(model.Email.Trim());
        if (user == null)
        {
            // do not reveal user existence
            ModelState.AddModelError("", "Invalid login attempt.");
            return View(model);
        }

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
        if (result.Succeeded)
        {
            return RedirectToLocal(returnUrl) ?? RedirectToAction("Dashboard", "Home");
        }
        if (result.IsLockedOut)
        {
            ModelState.AddModelError("", "Account locked. Try again later.");
            return View(model);
        }

        ModelState.AddModelError("", "Invalid login attempt.");
        return View(model);
    }

    [Authorize]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync(); // invalidates auth cookie
        // Optionally clear the entire session if you use Session
        HttpContext.Session?.Clear();
        return RedirectToAction("Login", "Account");
    }

    [AllowAnonymous]
    public IActionResult AccessDenied() => View();

    private IActionResult? RedirectToLocal(string? returnUrl)
    {
        if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            return Redirect(returnUrl);
        return null;
    }
}
