using ASP_project_4_Secure_App.DTOs;
using ASP_project_4_Secure_App.Models;
using ASP_project_4_Secure_App.Persistence;
using ASP_project_4_Secure_App.Security;
using Microsoft.EntityFrameworkCore;

namespace ASP_project_4_Secure_App.Services
{
    public class UserService
    {
        private readonly AppDbContext _db;
        private readonly PasswordHasher _hasher;
        private readonly CryptoService _crypto;

        public UserService(AppDbContext db, PasswordHasher hasher, CryptoService crypto)
        {
            _db = db; _hasher = hasher; _crypto = crypto;
        }

        public async Task<User> CreateAsync(UserCreateDto dto, CancellationToken ct)
        {
            var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email, ct);
            if (exists) throw new InvalidOperationException("Email already in use");

            var (hash, salt) = _hasher.HashPassword(dto.Password);
            var user = new User
            {
                Email = dto.Email.Trim(),
                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName.Trim(),
                PasswordHash = hash,
                PasswordSalt = salt,
                PhoneEncrypted = string.IsNullOrWhiteSpace(dto.Phone) ? null : _crypto.Encrypt(dto.Phone!)
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync(ct);
            return user;
        }

        public async Task<User?> AuthenticateAsync(UserLoginDto dto, CancellationToken ct)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == dto.Email, ct);
            if (user == null) return null;
            return _hasher.Verify(dto.Password, user.PasswordHash, user.PasswordSalt) ? user : null;
        }

        public UserReadDto ToRead(User user)
        {
            var phone = user.PhoneEncrypted == null ? null : _crypto.Decrypt(user.PhoneEncrypted);
            return new UserReadDto(user.Id, user.Email, user.FirstName, user.LastName, phone);
        }
    }
}
