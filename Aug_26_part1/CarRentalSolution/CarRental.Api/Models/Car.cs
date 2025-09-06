using System.ComponentModel.DataAnnotations;

namespace CarRental.Api.Models;

public class Car
{
    [Key] public int VehicleID { get; set; }
    [Required, MaxLength(50)] public string Make { get; set; } = "";
    [Required, MaxLength(50)] public string Model { get; set; } = "";
    [Range(1900, 2100)] public int Year { get; set; }
    [Range(0, double.MaxValue)] public decimal DailyRate { get; set; }
    [Required, MaxLength(20)] public string Status { get; set; } = "available";
    public int PassengerCapacity { get; set; }
    public int EngineCapacity { get; set; }
}
