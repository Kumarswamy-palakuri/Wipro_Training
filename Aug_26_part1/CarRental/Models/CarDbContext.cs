using Microsoft.EntityFrameworkCore;

namespace CarRental.Models
{
    public class CarDbContext : DbContext
    {
        //Constructor calling the Base DbContext Class Constructor
        public CarDbContext(DbContextOptions<CarDbContext> options) : base(options)
        {
        }
        //OnConfiguring() method is used to select and configure the data source
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle");
            modelBuilder.Entity<Users>().ToTable("Users");
        }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Users> Users { get; set; }

    }
}
