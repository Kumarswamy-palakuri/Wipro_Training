using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace ASP_project_4_Secure_App.Security
{
    public class HmacService
    {
        private readonly byte[] _keyBytes;
        private readonly HMAC _hmac;

        public HmacService(IConfiguration cfg)
        {
            var key = cfg["Security:Hmac:Key"];
            if (string.IsNullOrWhiteSpace(key))
                throw new InvalidOperationException("HMAC key not configured");

            _keyBytes = Encoding.UTF8.GetBytes(key);
            _hmac = new HMACSHA256(_keyBytes);
        }

        public string ComputeHash(string data)
        {
            var bytes = Encoding.UTF8.GetBytes(data);
            var hash = _hmac.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public string Compute(string data) => ComputeHash(data);

        public bool VerifyHash(string data, string hashToCompare)
        {
            var computed = ComputeHash(data);
            return computed == hashToCompare;
        }
    }
}
