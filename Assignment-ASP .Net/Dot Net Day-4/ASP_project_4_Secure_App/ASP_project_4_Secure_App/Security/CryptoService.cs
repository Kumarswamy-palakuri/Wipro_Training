using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;

namespace ASP_project_4_Secure_App.Security
{
    public class CryptoService
    {
        private readonly IDataProtector _protector;

        public CryptoService(IDataProtectionProvider provider, IConfiguration cfg)
        {
            var purpose = cfg.GetValue<string>("Security:FieldEncryption:ProtectorPurpose") ?? "FieldEncryptV1";
            _protector = provider.CreateProtector(purpose);
        }

        public string Encrypt(string plaintext)
        {
            if (string.IsNullOrEmpty(plaintext)) return plaintext;
            return _protector.Protect(plaintext);
        }

        public string Decrypt(string ciphertext)
        {
            if (string.IsNullOrEmpty(ciphertext)) return ciphertext;
            return _protector.Unprotect(ciphertext);
        }
    }
}
