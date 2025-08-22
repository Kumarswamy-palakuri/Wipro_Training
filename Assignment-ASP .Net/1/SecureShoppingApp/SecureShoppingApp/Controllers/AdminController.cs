using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureShoppingApp.Data;
using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;

namespace SecureShoppingApp.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<AdminController> _logger;

        public AdminController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<AdminController> logger)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        // GET: Admin/Dashboard
        public async Task<IActionResult> Dashboard()
        {
            try
            {
                var totalUsers = await _context.Users.CountAsync();
                var totalProducts = await _context.Products.CountAsync();
                var totalOrders = await _context.Orders.CountAsync();
                var totalRevenue = await _context.Orders.SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

                // Debug logging
                _logger.LogInformation("Dashboard data - Users: {totalUsers}, Products: {totalProducts}, Orders: {totalOrders}, Revenue: {totalRevenue}",
                    totalUsers, totalProducts, totalOrders, totalRevenue);

                var recentOrders = await _context.Orders
                    .Include(o => o.User)
                    .Include(o => o.Product)
                    .OrderByDescending(o => o.OrderDate)
                    .Take(5)
                    .Select(o => new RecentOrder
                    {
                        OrderId = o.Id,
                        UserName = $"{o.User.FirstName} {o.User.LastName}",
                        ProductName = o.Product.Name,
                        Amount = o.TotalAmount,
                        OrderDate = o.OrderDate
                    })
                    .ToListAsync();

                var model = new DashboardViewModel
                {
                    TotalUsers = totalUsers,
                    TotalProducts = totalProducts,
                    TotalOrders = totalOrders,
                    TotalRevenue = totalRevenue,
                    RecentOrders = recentOrders
                };

                // Set ViewBag as fallback
                ViewBag.TotalUsers = totalUsers;
                ViewBag.TotalProducts = totalProducts;
                ViewBag.TotalOrders = totalOrders;
                ViewBag.TotalRevenue = totalRevenue;

                return View(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading admin dashboard");

                // Return fallback data
                var fallbackModel = new DashboardViewModel
                {
                    TotalUsers = 0,
                    TotalProducts = 0,
                    TotalOrders = 0,
                    TotalRevenue = 0,
                    RecentOrders = new List<RecentOrder>()
                };

                ViewBag.TotalUsers = 0;
                ViewBag.TotalProducts = 0;
                ViewBag.TotalOrders = 0;
                ViewBag.TotalRevenue = 0;

                return View(fallbackModel);
            }
        }

        // GET: Admin/Users
        public async Task<IActionResult> Users()
        {
            try
            {
                var users = await _context.Users
                    .OrderBy(u => u.LastName)
                    .ThenBy(u => u.FirstName)
                    .ToListAsync();
                return View(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading users list");
                return View(new List<ApplicationUser>());
            }
        }

        // GET: Admin/UserDetails/id
        public async Task<IActionResult> UserDetails(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound();
            }

            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                var roles = await _userManager.GetRolesAsync(user);
                var orders = await _context.Orders
                    .Include(o => o.Product)
                    .Where(o => o.UserId == id)
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();

                var viewModel = new UserDetailsViewModel
                {
                    User = user,
                    Roles = roles.ToList(),
                    Orders = orders
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading user details for user {UserId}", id);
                return NotFound();
            }
        }

        // GET: Admin/EditUser/id
        public async Task<IActionResult> EditUser(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound();
            }

            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                var roles = await _userManager.GetRolesAsync(user);
                var editModel = new EditUserViewModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email!,
                    IsAdmin = roles.Contains("Admin")
                };

                return View(editModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading edit user form for user {UserId}", id);
                return NotFound();
            }
        }

        // POST: Admin/EditUser/id
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditUser(EditUserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            try
            {
                var user = await _userManager.FindByIdAsync(model.Id);
                if (user == null)
                {
                    return NotFound();
                }

                // Update user properties
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.UserName = model.Email;

                var updateResult = await _userManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    foreach (var error in updateResult.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return View(model);
                }

                // Handle role changes
                var currentRoles = await _userManager.GetRolesAsync(user);
                var isCurrentlyAdmin = currentRoles.Contains("Admin");

                if (model.IsAdmin && !isCurrentlyAdmin)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                    _logger.LogInformation("Admin role added to user {UserId}", user.Id);
                }
                else if (!model.IsAdmin && isCurrentlyAdmin)
                {
                    await _userManager.RemoveFromRoleAsync(user, "Admin");
                    _logger.LogInformation("Admin role removed from user {UserId}", user.Id);
                }

                TempData["Success"] = "User updated successfully!";
                return RedirectToAction(nameof(Users));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user {UserId}", model.Id);
                ModelState.AddModelError(string.Empty, "Failed to update user. Please try again.");
                return View(model);
            }
        }

        // GET: Admin/Orders
        public async Task<IActionResult> Orders()
        {
            try
            {
                var orders = await _context.Orders
                    .Include(o => o.User)
                    .Include(o => o.Product)
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();
                return View(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading orders list");
                return View(new List<Order>());
            }
        }

        // GET: Admin/OrderDetails/id
        public async Task<IActionResult> OrderDetails(int id)
        {
            try
            {
                var order = await _context.Orders
                    .Include(o => o.User)
                    .Include(o => o.Product)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (order == null)
                {
                    return NotFound();
                }

                return View(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading order details for order {OrderId}", id);
                return NotFound();
            }
        }

        // GET: Admin/Products
        public async Task<IActionResult> Products()
        {
            try
            {
                var products = await _context.Products
                    .OrderBy(p => p.Name)
                    .ToListAsync();
                return View(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading products list");
                return View(new List<Product>());
            }
        }

        // POST: Admin/DeleteUser/id
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return NotFound();
            }

            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    TempData["Error"] = "User not found.";
                    return RedirectToAction(nameof(Users));
                }

                // Prevent deleting the current admin user
                var currentUser = await _userManager.GetUserAsync(User);
                if (user.Id == currentUser?.Id)
                {
                    TempData["Error"] = "You cannot delete your own account.";
                    return RedirectToAction(nameof(Users));
                }

                // Check if user has orders
                var hasOrders = await _context.Orders.AnyAsync(o => o.UserId == id);
                if (hasOrders)
                {
                    TempData["Error"] = "Cannot delete user who has placed orders.";
                    return RedirectToAction(nameof(Users));
                }

                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    TempData["Success"] = "User deleted successfully!";
                    _logger.LogInformation("User {UserId} deleted successfully", id);
                }
                else
                {
                    TempData["Error"] = "Failed to delete user.";
                    _logger.LogWarning("Failed to delete user {UserId}", id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user {UserId}", id);
                TempData["Error"] = "Failed to delete user. Please try again.";
            }

            return RedirectToAction(nameof(Users));
        }

        // GET: Admin/SystemInfo
        public async Task<IActionResult> SystemInfo()
        {
            try
            {
                var totalUsers = await _context.Users.CountAsync();
                var totalProducts = await _context.Products.CountAsync();
                var totalOrders = await _context.Orders.CountAsync();
                var totalRevenue = await _context.Orders.SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

                var adminUsersCount = 0;
                var regularUsersCount = 0;

                var allUsers = await _context.Users.ToListAsync();
                foreach (var user in allUsers)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    if (roles.Contains("Admin"))
                        adminUsersCount++;
                    else
                        regularUsersCount++;
                }

                var systemInfo = new
                {
                    TotalUsers = totalUsers,
                    TotalProducts = totalProducts,
                    TotalOrders = totalOrders,
                    TotalRevenue = totalRevenue,
                    AdminUsers = adminUsersCount,
                    RegularUsers = regularUsersCount,
                    DatabaseType = "In-Memory Database",
                    ApplicationVersion = "1.0.0",
                    LastRestart = DateTime.Now.ToString("MMM dd, yyyy HH:mm"),
                    Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"
                };

                return View(systemInfo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading system information");
                return View();
            }
        }
    }
}
