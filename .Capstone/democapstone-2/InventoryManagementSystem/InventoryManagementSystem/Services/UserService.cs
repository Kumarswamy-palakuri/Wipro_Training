// backend/Services/UserService.cs
using InventoryManagementSystem.Data;
using InventoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.Password))
                return null;

            // Update last activity
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password is required");

            if (await _context.Users.AnyAsync(x => x.Username == user.Username))
                throw new ArgumentException("Username \"" + user.Username + "\" is already taken");

            user.Password = BCrypt.Net.BCrypt.HashPassword(password);
            user.CreatedAt = DateTime.UtcNow;
            user.IsActive = true;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task Update(User userParam, string password = null)
        {
            var user = await _context.Users.FindAsync(userParam.Id);

            if (user == null)
                throw new ArgumentException("User not found");

            if (userParam.Username != user.Username)
            {
                if (await _context.Users.AnyAsync(x => x.Username == userParam.Username))
                    throw new ArgumentException("Username " + userParam.Username + " is already taken");
            }

            user.Username = userParam.Username;
            user.Email = userParam.Email;
            user.Role = userParam.Role;
            user.IsActive = userParam.IsActive;
            user.UpdatedAt = DateTime.UtcNow;

            if (!string.IsNullOrWhiteSpace(password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(password);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<User>> GetInactiveUsers()
        {
            // Users who haven't been active for 30 days
            var cutoffDate = DateTime.UtcNow.AddDays(-30);
            return await _context.Users
                .Where(u => (u.UpdatedAt < cutoffDate || u.UpdatedAt == null) && u.IsActive)
                .ToListAsync();
        }

        public async Task<List<UserApproval>> GetPendingApprovals()
        {
            return await _context.UserApprovals
                .Include(a => a.User)
                .Where(a => a.Status == "Pending")
                .ToListAsync();
        }

        //public async Task<List<User>> GetPendingRegistrations()
        //{
        //    return await _context.Users
        //        .Where(u => u.Role == "Pending" && !u.IsActive)
        //        .ToListAsync();
        //}
        public async Task<List<User>> GetPendingRegistrations()
        {
            return await _context.Users
                .Where(u => u.Role == "Pending" && !u.IsActive)
                .Include(u => u.Approvals) // Include the approvals relationship
                .ToListAsync();
        }

        public async Task<bool> ProcessApproval(int approvalId, string status, string comments, int adminId)
        {
            var approval = await _context.UserApprovals
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == approvalId);

            if (approval == null)
                return false;

            approval.Status = status;
            approval.AdminComments = comments;
            approval.ReviewedAt = DateTime.UtcNow;
            approval.ReviewedByAdminId = adminId;

            if (status == "Approved")
            {
                approval.User.Role = approval.RequestedRole;
                approval.User.IsActive = true;
                approval.User.UpdatedAt = DateTime.UtcNow;
                _context.Users.Update(approval.User);
            }
            else if (status == "Rejected")
            {
                // Optionally, you can delete the user or keep them as inactive
                approval.User.IsActive = false;
                _context.Users.Update(approval.User);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserApproval> RequestRoleApproval(int userId, string requestedRole)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return null;

            var approval = new UserApproval
            {
                UserId = userId,
                RequestedRole = requestedRole,
                Status = "Pending",
                RequestedAt = DateTime.UtcNow
            };

            await _context.UserApprovals.AddAsync(approval);
            await _context.SaveChangesAsync();

            return approval;
        }

        private static bool VerifyPasswordHash(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }
}