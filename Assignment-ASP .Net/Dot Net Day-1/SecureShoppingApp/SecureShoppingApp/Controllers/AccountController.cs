using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureShoppingApp.Services;
using SecureShoppingApp.ViewModels;


namespace SecureShoppingApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IUserService userService, ILogger<AccountController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var result = await _userService.RegisterUserAsync(model);
                    if (result)
                    {
                        _logger.LogInformation("User {Email} registered successfully", model.Email);
                        TempData["Success"] = "Registration successful! Please log in.";
                        return RedirectToAction(nameof(Login));
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Registration failed. Please try again.");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error during user registration for {Email}", model.Email);
                    ModelState.AddModelError(string.Empty, "An error occurred during registration.");
                }
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var result = await _userService.LoginUserAsync(model);
                    if (result)
                    {
                        _logger.LogInformation("User {Email} logged in successfully", model.Email);

                        if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                        {
                            return Redirect(model.ReturnUrl);
                        }
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                        _logger.LogWarning("Failed login attempt for {Email}", model.Email);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error during login for {Email}", model.Email);
                    ModelState.AddModelError(string.Empty, "An error occurred during login.");
                }
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var user = await _userService.GetCurrentUserAsync();
            await _userService.LogoutUserAsync();

            _logger.LogInformation("User {Email} logged out", user?.Email);
            TempData["Success"] = "You have been logged out successfully.";

            return RedirectToAction("Index", "Home");
        }
    }
}