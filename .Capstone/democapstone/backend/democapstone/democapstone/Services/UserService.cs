using democapstone.Data;
using democapstone.Models;
using BCrypt.Net;


namespace democapstone.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _db;
    public UserService(AppDbContext db) => _db = db;

    public User? Validate(string username, string password)
    {
        var user = _db.Users.FirstOrDefault(u => u.Username == username);
        if (user is null) return null;
        return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash) ? user : null;
    }
}
