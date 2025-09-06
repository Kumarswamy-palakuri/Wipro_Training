// backend/Controllers/ProductsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;

namespace InventoryManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [Authorize(Roles = "Manager,Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            try
            {
                var createdProduct = await _productService.CreateProduct(product);
                return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, createdProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Manager,Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            if (id != product.Id)
                return BadRequest();

            var updatedProduct = await _productService.UpdateProduct(id, product);
            if (updatedProduct == null)
                return NotFound();

            return Ok(updatedProduct);
        }

        [Authorize(Roles = "Manager,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _productService.DeleteProduct(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [Authorize(Roles = "Staff,Manager,Admin")]
        [HttpPost("{id}/update-stock")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] StockUpdateRequest request)
        {
            var userId = int.Parse(User.Identity.Name);
            var result = await _productService.UpdateStock(
                id,
                request.QuantityChange,
                request.MovementType,
                request.Reason,
                userId
            );

            if (!result)
                return NotFound();

            return Ok(new { message = "Stock updated successfully" });
        }

        [HttpGet("{id}/movements")]
        public async Task<IActionResult> GetMovements(int id, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var movements = await _productService.GetInventoryMovements(id, startDate, endDate);
            return Ok(movements);
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStock()
        {
            var products = await _productService.GetLowStockProducts();
            return Ok(products);
        }
    }

    public class StockUpdateRequest
    {
        public int QuantityChange { get; set; }
        public string MovementType { get; set; }
        public string Reason { get; set; }
    }
}