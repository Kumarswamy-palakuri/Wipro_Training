using System.Security.Cryptography;

namespace ASP_project_4_Secure_App.Security
{
    public class PasswordHasher
    {
        private readonly int _iterations;
        private readonly int _saltSize;
        private readonly int _keySize;

        public PasswordHasher(IConfiguration cfg)
        {
            var section = cfg.GetSection("Security:PasswordHash");
            _iterations = section.GetValue<int>("IterCount");
            _saltSize = section.GetValue<int>("SaltSize");
            _keySize = section.GetValue<int>("KeySize");
        }

        public (string hash, string salt) HashPassword(string password)
        {
            var saltBytes = new byte[_saltSize];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, _iterations, HashAlgorithmName.SHA256);
            var key = pbkdf2.GetBytes(_keySize);
            return (Convert.ToBase64String(key), salt);
        }

        public bool Verify(string password, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, _iterations, HashAlgorithmName.SHA256);
            var key = pbkdf2.GetBytes(_keySize);
            var computedHash = Convert.ToBase64String(key);
            return computedHash == storedHash;
        }
    }
}
