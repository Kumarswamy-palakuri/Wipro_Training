namespace democapstone.Models;

public class PendingUser
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string RequestedRole { get; set; } = "Staff"; // Staff by default
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    public string? Reviewer { get; set; }
    public DateTime? ReviewedAt { get; set; }
}
