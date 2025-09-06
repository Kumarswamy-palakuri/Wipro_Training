using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.DataProtection;
using ProductManagementMile.Models;
using ProductManagementMile.Data;
using Microsoft.EntityFrameworkCore;

namespace ProductManagementMile.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IDataProtector _protector;

        public ProductController(ApplicationDbContext context, IDataProtectionProvider provider)
        {
            _context = context;
            _protector = provider.CreateProtector("ProductManagementMile.Product.Price");
        }

        public async Task<IActionResult> ProductList()
        {
            var products = await _context.Products.ToListAsync();

            // Decrypt prices for display
            foreach (var product in products)
            {
                product.Price = decimal.Parse(_protector.Unprotect(product.Price.ToString()));
            }

            return View(products);
        }

        [Authorize(Roles = "Admin")]
        public IActionResult CreateProduct()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                // Encrypt the price before storing
                product.Price = decimal.Parse(_protector.Protect(product.Price.ToString()));

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                TempData["SuccessMessage"] = $"Product \"{product.Name}\" has been successfully created!";
                return RedirectToAction("ProductList");
            }

            return View(product);
        }

        public async Task<IActionResult> EditProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Decrypt price for editing
            product.Price = decimal.Parse(_protector.Unprotect(product.Price.ToString()));

            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                // Encrypt the price before storing
                product.Price = decimal.Parse(_protector.Protect(product.Price.ToString()));

                _context.Products.Update(product);
                await _context.SaveChangesAsync();

                TempData["SuccessMessage"] = $"Product \"{product.Name}\" has been successfully updated!";
                return RedirectToAction("ProductList");
            }

            return View(product);
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Decrypt price for display
            product.Price = decimal.Parse(_protector.Unprotect(product.Price.ToString()));

            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProductConfirmed(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = $"Product \"{product.Name}\" has been successfully deleted!";
            }

            return RedirectToAction("ProductList");
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}