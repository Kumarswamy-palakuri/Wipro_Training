namespace InventoryManagementSystem.Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Pending"; // Admin, Manager, Staff, Pending
        public bool IsApproved { get; set; } = false;
    }
}