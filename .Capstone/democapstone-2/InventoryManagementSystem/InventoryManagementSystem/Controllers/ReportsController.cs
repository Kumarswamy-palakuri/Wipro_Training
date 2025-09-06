// backend/Controllers/ReportsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagementSystem.Services;
using ClosedXML.Excel;
using System.Text;

namespace InventoryManagementSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/reports")]
    public class ReportsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IUserService _userService;

        public ReportsController(IProductService productService, IUserService userService)
        {
            _productService = productService;
            _userService = userService;
        }

        [HttpGet("inventory/excel")]
        public async Task<IActionResult> GenerateInventoryReport()
        {
            var products = await _productService.GetAllProducts();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Inventory Report");
                var currentRow = 1;

                // Header
                worksheet.Cell(currentRow, 1).Value = "ID";
                worksheet.Cell(currentRow, 2).Value = "Name";
                worksheet.Cell(currentRow, 3).Value = "Description";
                worksheet.Cell(currentRow, 4).Value = "Category";
                worksheet.Cell(currentRow, 5).Value = "SKU";
                worksheet.Cell(currentRow, 6).Value = "Price";
                worksheet.Cell(currentRow, 7).Value = "Quantity";
                worksheet.Cell(currentRow, 8).Value = "Low Stock Threshold";
                worksheet.Cell(currentRow, 9).Value = "Status";

                // Format header
                var headerRange = worksheet.Range(1, 1, 1, 9);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

                // Data
                foreach (var product in products)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = product.Id;
                    worksheet.Cell(currentRow, 2).Value = product.Name;
                    worksheet.Cell(currentRow, 3).Value = product.Description;
                    worksheet.Cell(currentRow, 4).Value = product.Category;
                    worksheet.Cell(currentRow, 5).Value = product.Sku;
                    worksheet.Cell(currentRow, 6).Value = product.Price;
                    worksheet.Cell(currentRow, 7).Value = product.Quantity;
                    worksheet.Cell(currentRow, 8).Value = product.LowStockThreshold;
                    worksheet.Cell(currentRow, 9).Value = product.Quantity <= product.LowStockThreshold ? "Low Stock" : "OK";

                    // Highlight low stock items
                    if (product.Quantity <= product.LowStockThreshold)
                    {
                        worksheet.Cell(currentRow, 9).Style.Font.FontColor = XLColor.Red;
                    }
                }

                // Auto-fit columns
                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        $"Inventory_Report_{DateTime.UtcNow:yyyyMMddHHmmss}.xlsx");
                }
            }
        }

        [HttpGet("movements/excel")]
        public async Task<IActionResult> GenerateMovementsReport([FromQuery] int? productId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var movements = await _productService.GetAllMovements(startDate, endDate, null);

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Movement Report");
                var currentRow = 1;

                // Header
                worksheet.Cell(currentRow, 1).Value = "Date";
                worksheet.Cell(currentRow, 2).Value = "Product";
                worksheet.Cell(currentRow, 3).Value = "SKU";
                worksheet.Cell(currentRow, 4).Value = "Movement Type";
                worksheet.Cell(currentRow, 5).Value = "Quantity Changed";
                worksheet.Cell(currentRow, 6).Value = "User";
                worksheet.Cell(currentRow, 7).Value = "Reason";

                // Format header
                var headerRange = worksheet.Range(1, 1, 1, 7);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

                // Data
                foreach (var movement in movements)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = movement.MovementDate;
                    worksheet.Cell(currentRow, 2).Value = movement.Product.Name;
                    worksheet.Cell(currentRow, 3).Value = movement.Product.Sku;
                    worksheet.Cell(currentRow, 4).Value = movement.MovementType;
                    worksheet.Cell(currentRow, 5).Value = movement.QuantityChanged;
                    worksheet.Cell(currentRow, 6).Value = movement.User?.Username ?? "System";
                    worksheet.Cell(currentRow, 7).Value = movement.Reason;

                    // Color code movement types
                    if (movement.MovementType == "In")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.Green;
                    }
                    else if (movement.MovementType == "Out")
                    {
                        worksheet.Cell(currentRow, 4).Style.Font.FontColor = XLColor.Red;
                    }
                }

                // Auto-fit columns
                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        $"Movement_Report_{DateTime.UtcNow:yyyyMMddHHmmss}.xlsx");
                }
            }
        }
    }
}