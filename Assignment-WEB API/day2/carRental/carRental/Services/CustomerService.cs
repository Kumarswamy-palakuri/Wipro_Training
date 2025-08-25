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
    public class CustomerService
    {
        private readonly CarRentalDbContext _db;
        public CustomerService(CarRentalDbContext db) { _db = db; }

        public async Task<Customer> AddAsync(Customer customer)
        {
            _db.Customers.Add(customer);
            await _db.SaveChangesAsync();
            return customer;
        }

        public async Task<List<Customer>> GetAllAsync()
        {
            return await _db.Customers.AsNoTracking().ToListAsync();
        }

        public async Task<List<Customer>> SearchAsync(string? query)
        {
            IQueryable<Customer> search = _db.Customers.AsNoTracking();
            if (!string.IsNullOrEmpty(query))
            {
                query = query.ToLower();
                search = search.Where(c => c.FirstName.ToLower().Contains(query)
                                       || c.LastName.ToLower().Contains(query)
                                       || c.Email.ToLower().Contains(query));
            }
            return await search.ToListAsync();
        }
    }
}
