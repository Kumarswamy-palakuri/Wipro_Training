using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Aug_25_Car_Rental_Core.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext () { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        //OnConfiguring() method is used to select and configure the data source
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle");
            modelBuilder.Entity<Customer>().ToTable("Customer");
        }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Customer> Customers { get; set; }


    }
}
