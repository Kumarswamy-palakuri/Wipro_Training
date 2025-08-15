using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BankProject.Models
{
    public class BankDbContext : DbContext
    {
        public BankDbContext() {}

        public BankDbContext(DbContextOptions<BankDbContext> options) : base(options)
        {
        }

        //OnConfiguring() method is used to select and configure the data source
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BankAccount>().ToTable("Account");
            modelBuilder.Entity<BankTrans>().ToTable("Trans");
            modelBuilder.Entity<Login>().ToTable("Login");

        }

        public DbSet<BankAccount> Accounts { get; set; }
        public DbSet<BankTrans> Trans { get; set; }

        public DbSet<Login> Logins { get; set; }
    }
}
