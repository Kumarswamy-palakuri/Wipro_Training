// backend/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using InventoryManagementSystem.Models;

namespace InventoryManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<InventoryMovement> InventoryMovements { get; set; }
        public DbSet<UserApproval> UserApprovals { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Seed initial admin user
        //    modelBuilder.Entity<User>().HasData(
        //        new User
        //        {
        //            Id = 1,
        //            Username = "admin",
        //            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
        //            Email = "admin@inventory.com",
        //            Role = "Admin",
        //            CreatedAt = DateTime.UtcNow
        //        },
        //        new User
        //        {
        //            Id = 2,
        //            Username = "manager",
        //            Password = BCrypt.Net.BCrypt.HashPassword("manager123"),
        //            Email = "manager@inventory.com",
        //            Role = "Manager",
        //            CreatedAt = DateTime.UtcNow
        //        },
        //        new User
        //        {
        //            Id = 3,
        //            Username = "staff",
        //            Password = BCrypt.Net.BCrypt.HashPassword("staff123"),
        //            Email = "staff@inventory.com",
        //            Role = "Staff",
        //            CreatedAt = DateTime.UtcNow
        //        }
        //    );

        //    // Seed sample products
        //    modelBuilder.Entity<Product>().HasData(
        //        new Product
        //        {
        //            Id = 1,
        //            Name = "Laptop",
        //            Description = "High-performance business laptop",
        //            Price = 1200.00m,
        //            Quantity = 15,
        //            LowStockThreshold = 5,
        //            Category = "Electronics",
        //            Sku = "ELEC-001",
        //            CreatedAt = DateTime.UtcNow
        //        },
        //        new Product
        //        {
        //            Id = 2,
        //            Name = "Monitor",
        //            Description = "27-inch 4K monitor",
        //            Price = 450.00m,
        //            Quantity = 22,
        //            LowStockThreshold = 5,
        //            Category = "Electronics",
        //            Sku = "ELEC-002",
        //            CreatedAt = DateTime.UtcNow
        //        },
        //        new Product
        //        {
        //            Id = 3,
        //            Name = "Desk Chair",
        //            Description = "Ergonomic office chair",
        //            Price = 250.00m,
        //            Quantity = 8,
        //            LowStockThreshold = 5,
        //            Category = "Furniture",
        //            Sku = "FURN-001",
        //            CreatedAt = DateTime.UtcNow
        //        },
        //        new Product
        //        {
        //            Id = 4,
        //            Name = "Notebook",
        //            Description = "A4 size, 100 pages",
        //            Price = 5.99m,
        //            Quantity = 3,
        //            LowStockThreshold = 10,
        //            Category = "Stationery",
        //            Sku = "STAT-001",
        //            CreatedAt = DateTime.UtcNow
        //        }
        //    );

        //}
        // backend/Data/ApplicationDbContext.cs
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure UserApproval relationships
            modelBuilder.Entity<UserApproval>()
                .HasOne(ua => ua.User)
                .WithMany()
                .HasForeignKey(ua => ua.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserApproval>()
                .HasOne(ua => ua.ReviewedByAdmin)
                .WithMany()
                .HasForeignKey(ua => ua.ReviewedByAdminId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed initial admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Email = "admin@inventory.com",
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new User
                {
                    Id = 2,
                    Username = "manager",
                    Password = BCrypt.Net.BCrypt.HashPassword("manager123"),
                    Email = "manager@inventory.com",
                    Role = "Manager",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new User
                {
                    Id = 3,
                    Username = "staff",
                    Password = BCrypt.Net.BCrypt.HashPassword("staff123"),
                    Email = "staff@inventory.com",
                    Role = "Staff",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            );

            // Seed sample products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Laptop",
                    Description = "High-performance business laptop",
                    Price = 1200.00m,
                    Quantity = 15,
                    LowStockThreshold = 5,
                    Category = "Electronics",
                    Sku = "ELEC-001",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Id = 2,
                    Name = "Monitor",
                    Description = "27-inch 4K monitor",
                    Price = 450.00m,
                    Quantity = 22,
                    LowStockThreshold = 5,
                    Category = "Electronics",
                    Sku = "ELEC-002",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Id = 3,
                    Name = "Desk Chair",
                    Description = "Ergonomic office chair",
                    Price = 250.00m,
                    Quantity = 8,
                    LowStockThreshold = 5,
                    Category = "Furniture",
                    Sku = "FURN-001",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Id = 4,
                    Name = "Notebook",
                    Description = "A4 size, 100 pages",
                    Price = 5.99m,
                    Quantity = 3,
                    LowStockThreshold = 10,
                    Category = "Stationery",
                    Sku = "STAT-001",
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}