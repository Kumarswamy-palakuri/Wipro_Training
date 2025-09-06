using CarRental.Api.Models;

namespace CarRental.Api.Repos;

public interface ICarLeaseRepository
{
    // Car
    Task AddCarAsync(Car car);
    Task RemoveCarAsync(int carID);
    Task<List<Car>> ListAvailableCarsAsync();
    Task<List<Car>> ListRentedCarsAsync();
    Task<Car?> FindCarByIdAsync(int carID);

    // Customer
    Task AddCustomerAsync(Customer customer);
    Task RemoveCustomerAsync(int customerID);
    Task<List<Customer>> ListCustomersAsync();
    Task<Customer?> FindCustomerByIdAsync(int customerID);

    // Lease
    Task<Lease> CreateLeaseAsync(int customerID, int carID, DateTime startDate, DateTime endDate, string type);
    Task<Lease> ReturnCarAsync(int leaseID);
    Task<List<Lease>> ListActiveLeasesAsync();
    Task<List<Lease>> ListLeaseHistoryAsync();

    // Payment
    Task RecordPaymentAsync(int leaseID, decimal amount);
    Task<List<Payment>> GetPaymentHistoryByCustomerAsync(int customerID);
    Task<decimal> GetTotalRevenueAsync();
}
