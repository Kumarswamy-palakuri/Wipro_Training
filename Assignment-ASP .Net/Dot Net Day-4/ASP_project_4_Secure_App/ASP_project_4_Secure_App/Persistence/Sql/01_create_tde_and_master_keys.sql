-- On master: create a Database Master Key if not present
USE master;
GO
IF NOT EXISTS (SELECT * FROM sys.symmetric_keys WHERE name = '##MS_DatabaseMasterKey##')
BEGIN
    CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'Strong_Master_Key_Password_ChangeMe!';
END
GO

-- Create a server certificate for TDE
IF NOT EXISTS (SELECT * FROM sys.certificates WHERE name = 'TDE_Server_Cert')
BEGIN
    CREATE CERTIFICATE TDE_Server_Cert
    WITH SUBJECT = 'TDE Certificate';
END
GO

-- On application database
USE SecureAppDb;
GO

-- Create database encryption key and enable TDE
IF NOT EXISTS (SELECT * FROM sys.dm_database_encryption_keys WHERE database_id = DB_ID('SecureAppDb'))
BEGIN
    CREATE DATABASE ENCRYPTION KEY
    WITH ALGORITHM = AES_256
    ENCRYPTION BY SERVER CERTIFICATE TDE_Server_Cert;
    ALTER DATABASE SecureAppDb SET ENCRYPTION ON;
END
GO
