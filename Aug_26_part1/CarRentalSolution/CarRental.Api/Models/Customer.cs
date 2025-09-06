using System.ComponentModel.DataAnnotations;

namespace CarRental.Api.Models;

public class Customer
{
    [Key] public int CustomerID { get; set; }
    [Required, MaxLength(50)] public string FirstName { get; set; } = "";
    [Required, MaxLength(50)] public string LastName { get; set; } = "";
    [Required, MaxLength(100)] public string Email { get; set; } = "";
    [Required, MaxLength(20)] public string PhoneNumber { get; set; } = "";
}
