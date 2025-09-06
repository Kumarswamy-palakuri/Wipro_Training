// backend/Services/IUserService.cs
using InventoryManagementSystem.Models;

namespace InventoryManagementSystem.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<List<User>> GetAllUsers();
        Task<User> GetById(int id);
        Task<User> Create(User user, string password);
        Task Update(User user, string password = null);
        Task Delete(int id);
        Task<List<User>> GetInactiveUsers();
        Task<List<UserApproval>> GetPendingApprovals();
        Task<List<User>> GetPendingRegistrations();
        Task<bool> ProcessApproval(int approvalId, string status, string comments, int adminId);
        Task<UserApproval> RequestRoleApproval(int userId, string requestedRole);
    }
}