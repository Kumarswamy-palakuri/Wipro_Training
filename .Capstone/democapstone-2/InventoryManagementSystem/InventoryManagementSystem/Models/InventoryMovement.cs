// backend/Models/InventoryMovement.cs
using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Models
{
    public class InventoryMovement
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        public int QuantityChanged { get; set; }

        [Required]
        public string MovementType { get; set; } // In, Out, Adjustment

        public string Reason { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public DateTime MovementDate { get; set; } = DateTime.UtcNow;
    }
}