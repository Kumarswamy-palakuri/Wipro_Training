using CMSApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CMSApi.Data
{
    public class CmsContext : DbContext
    {
        public CmsContext(DbContextOptions<CmsContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships
            modelBuilder.Entity<Wallet>()
                .HasOne(w => w.Customer)
                .WithMany()
                .HasForeignKey(w => w.CustId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
