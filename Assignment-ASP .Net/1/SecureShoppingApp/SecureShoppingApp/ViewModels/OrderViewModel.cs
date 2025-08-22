using System.ComponentModel.DataAnnotations;

namespace SecureShoppingApp.ViewModels
{
    public class OrderViewModel
    {
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100")]
        public int Quantity { get; set; }

        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
        public decimal TotalAmount => ProductPrice * Quantity;
    }
}