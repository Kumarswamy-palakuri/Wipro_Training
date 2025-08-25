using SecureApp.Models;

namespace jwt_Assignment_ex.Models
{
    public class UserRole
    {
        public int UserId { get; set; }

        public User user { get; set; }

        public int RoleId { get; set; }

        public Role role { get; set; }
    }
}
