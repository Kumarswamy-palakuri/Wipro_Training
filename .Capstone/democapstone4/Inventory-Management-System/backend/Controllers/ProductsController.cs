using InventoryManagementSystem.Backend.Data;
using InventoryManagementSystem.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Authorize(Policy = "RequireAuthenticated")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Products.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _context.Products.Find(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        [Authorize(Policy = "RequireAdmin")]
        public IActionResult Add([FromBody] AddProductDto dto)
        {
            var product = new Product { Name = dto.Name, Quantity = dto.Quantity, Price = dto.Price, LowThreshold = dto.LowThreshold };
            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "RequireManagerOrAdmin")]
        public IActionResult Update(int id, [FromBody] UpdateProductDto dto)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();
            if (dto.Name != null) product.Name = dto.Name;
            if (dto.Quantity.HasValue) product.Quantity = dto.Quantity.Value;
            if (dto.Price.HasValue) product.Price = dto.Price.Value;
            if (dto.LowThreshold.HasValue) product.LowThreshold = dto.LowThreshold.Value;
            _context.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "RequireAdmin")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok();
        }
    }

    public class AddProductDto
    {
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int LowThreshold { get; set; } = 5;
    }

    public class UpdateProductDto
    {
        public string? Name { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public int? LowThreshold { get; set; }
    }
}