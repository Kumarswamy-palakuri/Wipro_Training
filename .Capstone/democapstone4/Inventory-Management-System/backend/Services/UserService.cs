using InventoryManagementSystem.Backend.Data;
using InventoryManagementSystem.Backend.Models;

namespace InventoryManagementSystem.Backend.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetPendingApprovals()
        {
            return _context.Users.Where(u => !u.IsApproved && u.Role == "Pending").ToList();
        }

        public void Approve(int id, string role)
        {
            var user = _context.Users.Find(id);
            if (user == null || user.IsApproved) return;
            user.IsApproved = true;
            user.Role = role;
            _context.SaveChanges();
        }

        public void Reject(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return;
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}