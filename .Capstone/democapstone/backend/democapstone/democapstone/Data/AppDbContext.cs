using Microsoft.EntityFrameworkCore;
using democapstone.Models;

namespace democapstone.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<InventoryMovement> InventoryMovements => Set<InventoryMovement>();
    public DbSet<PendingUser> PendingUsers => Set<PendingUser>();

}
