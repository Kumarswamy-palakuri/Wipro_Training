using System.ComponentModel.DataAnnotations;

namespace CarRentals.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; } 
        public string? UserName { get; set; } 
        public string? Password { get; set; }
    }
}
