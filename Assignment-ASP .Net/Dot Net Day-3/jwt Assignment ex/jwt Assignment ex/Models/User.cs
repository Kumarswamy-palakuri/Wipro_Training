using jwt_Assignment_ex.Models;
using System.Collections.Generic;

namespace SecureApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}