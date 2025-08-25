namespace carRental.Entities
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public double DailyRate { get; set; }
        public string Status { get; set; } = "available"; // available, notAvailable
        public int PassengerCapacity { get; set; }
        public int EngineCapacity { get; set; }
        public string Type { get; set; } = string.Empty; // sedan, suv, hatchback, etc.
    }
}
