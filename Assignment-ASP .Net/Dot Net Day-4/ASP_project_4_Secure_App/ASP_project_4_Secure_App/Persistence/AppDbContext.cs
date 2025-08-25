using ASP_project_4_Secure_App.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP_project_4_Secure_App.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Payment> Payments => Set<Payment>();

        protected override void OnModelCreating(ModelBuilder b)
        {
            b.Entity<User>(e =>
            {
                e.HasIndex(x => x.Email).IsUnique();
                e.Property(x => x.Email).IsRequired().HasMaxLength(128);
                e.Property(x => x.PasswordHash).IsRequired();
                e.Property(x => x.PasswordSalt).IsRequired();
                e.Property(x => x.Role).HasMaxLength(32).HasDefaultValue("User");
            });

            b.Entity<Payment>(e =>
            {
                e.HasIndex(x => new { x.UserId, x.CreatedAt });
                e.Property(x => x.Currency).HasMaxLength(3);
            });
        }
    }
}
