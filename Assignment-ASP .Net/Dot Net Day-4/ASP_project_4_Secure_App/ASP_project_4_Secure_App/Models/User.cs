using System.ComponentModel.DataAnnotations;

namespace ASP_project_4_Secure_App.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required, MaxLength(128)]
        public string Email { get; set; } = default!;

        [Required, MaxLength(64)]
        public string FirstName { get; set; } = default!;

        [Required, MaxLength(64)]
        public string LastName { get; set; } = default!;

        // Secure storage
        [Required]
        public string PasswordHash { get; set; } = default!;
        [Required]
        public string PasswordSalt { get; set; } = default!;

        public string? PhoneEncrypted { get; set; } // encrypted with DataProtector

        // RBAC
        public string Role { get; set; } = "User";

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
