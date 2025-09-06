using CarRental.Api.Data;
using CarRental.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Repos;

public class CarLeaseRepository : ICarLeaseRepository
{
    private readonly AppDbContext _db;
    public CarLeaseRepository(AppDbContext db) { _db = db; }

    // Car
    public async Task AddCarAsync(Car car)
    {
        if (string.IsNullOrWhiteSpace(car.Status)) car.Status = "available";
        _db.Vehicles.Add(car);
        await _db.SaveChangesAsync();
    }

    public async Task RemoveCarAsync(int carID)
    {
        var car = await _db.Vehicles.FindAsync(carID);
        if (car == null) throw new KeyNotFoundException($"Car {carID} not found");
        _db.Vehicles.Remove(car);
        await _db.SaveChangesAsync();
    }

    public Task<List<Car>> ListAvailableCarsAsync() =>
      _db.Vehicles.Where(v => v.Status == "available").ToListAsync();

    public Task<List<Car>> ListRentedCarsAsync() =>
      _db.Vehicles.Where(v => v.Status == "notAvailable").ToListAsync();

    public Task<Car?> FindCarByIdAsync(int carID) =>
      _db.Vehicles.FirstOrDefaultAsync(v => v.VehicleID == carID);

    // Customer
    public async Task AddCustomerAsync(Customer customer)
    {
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync();
    }

    public async Task RemoveCustomerAsync(int customerID)
    {
        var cust = await _db.Customers.FindAsync(customerID);
        if (cust == null) throw new KeyNotFoundException($"Customer {customerID} not found");
        _db.Customers.Remove(cust);
        await _db.SaveChangesAsync();
    }

    public Task<List<Customer>> ListCustomersAsync() => _db.Customers.ToListAsync();

    public Task<Customer?> FindCustomerByIdAsync(int customerID) =>
      _db.Customers.FirstOrDefaultAsync(c => c.CustomerID == customerID);

    // Lease
    public async Task<Lease> CreateLeaseAsync(int customerID, int carID, DateTime startDate, DateTime endDate, string type)
    {
        var car = await _db.Vehicles.FirstOrDefaultAsync(v => v.VehicleID == carID);
        if (car == null) throw new KeyNotFoundException($"Car {carID} not found");
        if (!string.Equals(car.Status, "available", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Car not available");

        var cust = await _db.Customers.FirstOrDefaultAsync(c => c.CustomerID == customerID);
        if (cust == null) throw new KeyNotFoundException($"Customer {customerID} not found");

        var lease = new Lease { VehicleID = carID, CustomerID = customerID, StartDate = startDate.Date, EndDate = endDate.Date, Type = type };
        car.Status = "notAvailable";
        _db.Leases.Add(lease);
        await _db.SaveChangesAsync();
        return lease;
    }

    public async Task<Lease> ReturnCarAsync(int leaseID)
    {
        var lease = await _db.Leases.FirstOrDefaultAsync(l => l.LeaseID == leaseID);
        if (lease == null) throw new KeyNotFoundException($"Lease {leaseID} not found");
        var car = await _db.Vehicles.FirstAsync(v => v.VehicleID == lease.VehicleID);
        car.Status = "available";
        await _db.SaveChangesAsync();
        return lease;
    }

    public Task<List<Lease>> ListActiveLeasesAsync() =>
      _db.Leases.Include(l => l.Car).Where(l => l.Car!.Status == "notAvailable").ToListAsync();

    public Task<List<Lease>> ListLeaseHistoryAsync() => _db.Leases.ToListAsync();

    // Payment
    public async Task RecordPaymentAsync(int leaseID, decimal amount)
    {
        var lease = await _db.Leases.FindAsync(leaseID);
        if (lease == null) throw new KeyNotFoundException($"Lease {leaseID} not found");
        _db.Payments.Add(new Payment { LeaseID = leaseID, Amount = amount, PaymentDate = DateTime.UtcNow.Date });
        await _db.SaveChangesAsync();
    }

    public Task<List<Payment>> GetPaymentHistoryByCustomerAsync(int customerID) =>
      _db.Payments.Include(p => p.Lease).Where(p => p.Lease!.CustomerID == customerID)
        .OrderByDescending(p => p.PaymentDate).ToListAsync();

    public async Task<decimal> GetTotalRevenueAsync()
    {
        var sum = await _db.Payments.SumAsync(p => (decimal?)p.Amount);
        return sum ?? 0m;
    }
}
