using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace SecureApp.Services
{
    public class PasswordHasher
    {
        public static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(16); // 128-bit salt
            hash = KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA256,
                100000,
                32); // 256-bit key
        }

        public static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            var hash = KeyDerivation.Pbkdf2(
                password,
                storedSalt,
                KeyDerivationPrf.HMACSHA256,
                100000,
                32);

            return hash.SequenceEqual(storedHash);
        }
    }
}