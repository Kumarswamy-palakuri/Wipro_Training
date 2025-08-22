using System.ComponentModel.DataAnnotations;

namespace SecureShoppingApp.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        // Remove the default DateTime.UtcNow assignment
        public DateTime CreatedAt { get; set; }
    }
}
