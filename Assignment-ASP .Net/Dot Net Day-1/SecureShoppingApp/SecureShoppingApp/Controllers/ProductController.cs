using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecureShoppingApp.Data;
using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;
using System.Security.Claims;


namespace SecureShoppingApp.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<ProductController> _logger;

        public ProductController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            ILogger<ProductController> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        // GET: Product
        public async Task<IActionResult> Index()
        {
            var products = await _context.Products
                .OrderBy(p => p.Name)
                .ToListAsync();
            return View(products);
        }

        // GET: Product/Details/5
        //public async Task<IActionResult> Details(int id)
        //{
        //    var product = await _context.Products.FindAsync(id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(product);
        //}


        // GET: Product/Details/5
        // GET: Product/Details/5
        public async Task<IActionResult> Details(int id)
        {
            _logger.LogInformation("Details action called with id: {id}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid id provided: {id}", id);
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                _logger.LogWarning("Product not found with id: {id}", id);
                return NotFound();
            }

            _logger.LogInformation("Found product: {productName}", product.Name);
            return View(product);
        }

        // POST: Product/Order
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Order(OrderViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Invalid order data.";
                return RedirectToAction(nameof(Details), new { id = model.ProductId });
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Challenge();
            }

            var product = await _context.Products.FindAsync(model.ProductId);
            if (product == null)
            {
                TempData["Error"] = "Product not found.";
                return RedirectToAction(nameof(Index));
            }

            try
            {
                var order = new Order
                {
                    UserId = user.Id,
                    ProductId = model.ProductId,
                    Quantity = model.Quantity,
                    TotalAmount = product.Price * model.Quantity,
                    OrderDate = DateTime.UtcNow
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                TempData["Success"] = "Order placed successfully!";
                _logger.LogInformation("Order created for user {UserId}, product {ProductId}", user.Id, model.ProductId);
                return RedirectToAction(nameof(MyOrders));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating order for user {UserId}", user.Id);
                TempData["Error"] = "Failed to place order. Please try again.";
                return RedirectToAction(nameof(Details), new { id = model.ProductId });
            }
        }

        // GET: Product/MyOrders
        [Authorize]
        public async Task<IActionResult> MyOrders()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Challenge();
            }

            var orders = await _context.Orders
                .Include(o => o.Product)
                .Where(o => o.UserId == user.Id)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return View(orders);
        }

        // GET: Product/Create (Admin only)
        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Product/Create (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var product = new Product
                    {
                        Name = model.Name,
                        Description = model.Description,
                        Price = model.Price,
                        CreatedAt = DateTime.UtcNow
                    };

                    _context.Products.Add(product);
                    await _context.SaveChangesAsync();

                    TempData["Success"] = "Product created successfully!";
                    _logger.LogInformation("Product {ProductName} created successfully", model.Name);
                    return RedirectToAction("Dashboard", "Admin");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error creating product {ProductName}", model.Name);
                    ModelState.AddModelError(string.Empty, "Failed to create product. Please try again.");
                }
            }
            return View(model);
        }

        // GET: Product/Edit/5 (Admin only)
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var model = new ProductViewModel
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price
            };

            return View(model);
        }

        // POST: Product/Edit/5 (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductViewModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var product = await _context.Products.FindAsync(id);
                    if (product == null)
                    {
                        return NotFound();
                    }

                    product.Name = model.Name;
                    product.Description = model.Description;
                    product.Price = model.Price;

                    await _context.SaveChangesAsync();

                    TempData["Success"] = "Product updated successfully!";
                    _logger.LogInformation("Product {ProductId} updated successfully", id);
                    return RedirectToAction("Dashboard", "Admin");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error updating product {ProductId}", id);
                    ModelState.AddModelError(string.Empty, "Failed to update product. Please try again.");
                }
            }
            return View(model);
        }

        // POST: Product/Delete/5 (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    TempData["Error"] = "Product not found.";
                    return RedirectToAction("Dashboard", "Admin");
                }

                // Check if product has orders
                var hasOrders = await _context.Orders.AnyAsync(o => o.ProductId == id);
                if (hasOrders)
                {
                    TempData["Error"] = "Cannot delete product that has existing orders.";
                    return RedirectToAction("Dashboard", "Admin");
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                TempData["Success"] = "Product deleted successfully!";
                _logger.LogInformation("Product {ProductId} deleted successfully", id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting product {ProductId}", id);
                TempData["Error"] = "Failed to delete product. Please try again.";
            }

            return RedirectToAction("Dashboard", "Admin");
        }
    }
}
