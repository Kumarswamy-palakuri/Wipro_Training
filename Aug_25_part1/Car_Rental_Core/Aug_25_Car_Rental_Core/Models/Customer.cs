using System.ComponentModel.DataAnnotations;

namespace Aug_25_Car_Rental_Core.Models
{
    public class Customer
    {
        [Key]
        public int CustomerID { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

    }
}
