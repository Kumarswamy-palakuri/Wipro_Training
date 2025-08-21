using Microsoft.EntityFrameworkCore;

namespace lmsApi.Models
{
   
        public class LmsDbContext : DbContext
        {
            public LmsDbContext() { }

            public LmsDbContext(DbContextOptions<LmsDbContext> options) : base(options)
            {
            }

            //OnConfiguring() method is used to select and configure the data source
            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {

            }
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Employee>().ToTable("Employee");
                modelBuilder.Entity<LeaveHistory>().ToTable("LeaveHistory");

            }

            public DbSet<Employee> Employees { get; set; }

            public DbSet<LeaveHistory> LeaveHistories { get; set; }
        }
    
}
