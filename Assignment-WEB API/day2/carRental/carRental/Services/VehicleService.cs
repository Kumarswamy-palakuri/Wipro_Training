using carRental.Data;
using carRental.Entities;
//using CarRentalSystem.Data;
//using CarRentalSystem.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carRental.Services
{
    public class VehicleService
    {
        private readonly CarRentalDbContext _db;
        public VehicleService(CarRentalDbContext db) { _db = db; }

        public async Task<Vehicle> AddAsync(Vehicle vehicle)
        {
            _db.Vehicles.Add(vehicle);
            await _db.SaveChangesAsync();
            return vehicle;
        }

        public async Task<List<Vehicle>> GetAllAsync()
        {
            return await _db.Vehicles.AsNoTracking().ToListAsync();
        }

        public async Task<List<Vehicle>> GetByTypeAsync(string type)
        {
            return await _db.Vehicles.Where(v => v.Type.ToLower() == type.ToLower()).AsNoTracking().ToListAsync();
        }

        public async Task<List<Vehicle>> GetByTypeAndAvailabilityAsync(string type, bool available)
        {
            var status = available ? "available" : "notAvailable";
            return await _db.Vehicles.Where(v => v.Type.ToLower() == type.ToLower() && v.Status == status).AsNoTracking().ToListAsync();
        }
    }
}
