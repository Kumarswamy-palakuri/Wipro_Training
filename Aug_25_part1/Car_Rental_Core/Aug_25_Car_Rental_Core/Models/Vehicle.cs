using System.ComponentModel.DataAnnotations;

namespace Aug_25_Car_Rental_Core.Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleID { get; set; }

        public string? Make {  get; set; }

        public string? Model { get; set; }

        public int? Year { get; set; }

        public string? DailyRate { get; set; }

        public string? Status { get; set; }

        public string? PassengerCapacity { get; set; }

        public string? EngineCapacity { get; set; }

    }
}
