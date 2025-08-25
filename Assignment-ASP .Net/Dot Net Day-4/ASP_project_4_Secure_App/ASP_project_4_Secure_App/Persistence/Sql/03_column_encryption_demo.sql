-- Demo of Always Encrypted keys (requires client-side driver support).
-- In production, manage keys via Azure Key Vault / HSM-backed CMK.

USE SecureAppDb;
GO

-- Create Column Master Key (CMK) metadata
IF NOT EXISTS (SELECT * FROM sys.column_master_keys WHERE name = 'CMK_Local')
BEGIN
    CREATE COLUMN MASTER KEY CMK_Local
    WITH (KEY_STORE_PROVIDER_NAME = N'MSSQL_CERTIFICATE_STORE',
          KEY_PATH = N'CurrentUser/my/<ThumbprintOfLocalCert>');
END
GO

-- Create Column Encryption Key (CEK)
IF NOT EXISTS (
    SELECT * FROM sys.column_encryption_keys WHERE name = 'CEK1'
)
BEGIN
    CREATE COLUMN ENCRYPTION KEY CEK1
    WITH VALUES (
        COLUMN_MASTER_KEY = CMK_Local,
        ALGORITHM = 'RSA_OAEP'
    );
END
GO


-- Example: mark a column Always Encrypted
-- ALTER TABLE dbo.Users ADD PhoneAE nvarchar(50) COLLATE Latin1_General_BIN2 ENCRYPTED WITH (COLUMN_ENCRYPTION_KEY = CEK1, ENCRYPTION_TYPE = Randomized, ALGORITHM = 'AEAD_AES_256_CBC_HMAC_SHA_256') NULL;
