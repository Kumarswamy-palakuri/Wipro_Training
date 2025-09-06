using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental.Api.Models;

public class Lease
{
    [Key] public int LeaseID { get; set; }
    [ForeignKey(nameof(Car))] public int VehicleID { get; set; }
    public Car? Car { get; set; }
    [ForeignKey(nameof(Customer))] public int CustomerID { get; set; }
    public Customer? Customer { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    [Required, MaxLength(20)] public string Type { get; set; } = "Daily"; // Daily|Monthly
}
