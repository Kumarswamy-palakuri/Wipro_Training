using SecureApp.Models;

namespace SecureApp.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user, List<string> roles);
    }
}