using System.Security.Cryptography;
using System.Text;

namespace CMSApi.Helpers
{
    public static class EncryptionHelper
    {
        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "abc123";
            byte[] clearBytes = Encoding.UTF8.GetBytes(clearText);
            using (Aes aes = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6E, 0x20, 0x4D, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                aes.Key = pdb.GetBytes(32);
                aes.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }

        }
public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "abc123";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            using (Aes aes = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(
                    EncryptionKey,
                    new byte[] { 0x49, 0x76, 0x61, 0x6E,
                         0x20, 0x4D, 0x65, 0x64,
                         0x76, 0x65, 0x64, 0x65,
                         0x76 } // salt
                );

                aes.Key = pdb.GetBytes(32);  // 256-bit key
                aes.IV = pdb.GetBytes(16);   // 128-bit IV

                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, aes.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.FlushFinalBlock();   // 🔑 ensures proper decryption
                    }

                    return Encoding.UTF8.GetString(ms.ToArray());
                }
            }
        }

    }
}


