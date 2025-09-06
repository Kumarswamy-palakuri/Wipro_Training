using CarRental.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Api.Data;

public class AppUser : IdentityUser { }

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Car> Vehicles => Set<Car>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Lease> Leases => Set<Lease>();
    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Car>().ToTable("Vehicle");
        b.Entity<Customer>().ToTable("Customer");
        b.Entity<Lease>().ToTable("Lease");
        b.Entity<Payment>().ToTable("Payment");
        b.Entity<Car>().Property(x => x.Status).HasMaxLength(20);
        b.Entity<Lease>().Property(x => x.Type).HasMaxLength(20);
    }
}
