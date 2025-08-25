using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Tasker.Data;

public class ApplicationUser : IdentityUser
{
    // Additional profile fields as needed
    // Example: public string DisplayName { get; set; } = "";
}

public class TaskItem
{
    public int Id { get; set; }
    public string OwnerUserId { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Description { get; set; } = ""; // will be HTML-encoded on output
    public bool Completed { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<TaskItem>()
            .HasIndex(t => new { t.OwnerUserId, t.Id });
    }
}
