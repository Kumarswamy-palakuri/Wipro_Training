// Models/Product.cs
using System.ComponentModel.DataAnnotations;

namespace ProblemManagement.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Product Name")]
        public string Name { get; set; } = string.Empty; // Initialize with empty string

        [Required]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }
    }
}