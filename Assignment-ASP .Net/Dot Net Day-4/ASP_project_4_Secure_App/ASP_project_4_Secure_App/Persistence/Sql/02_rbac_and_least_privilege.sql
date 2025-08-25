USE SecureAppDb;
GO

-- Create roles
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'db_app_reader')
    CREATE ROLE db_app_reader;
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'db_app_writer')
    CREATE ROLE db_app_writer;

-- Create contained user for application (from SQL login)
-- Create login at server level separately if needed:
-- CREATE LOGIN app_login WITH PASSWORD='Strong#Password#ChangeMe!';
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'app_user')
    CREATE USER app_user FOR LOGIN app_login;

-- Grants: least privilege
GRANT SELECT ON SCHEMA::dbo TO db_app_reader;
GRANT INSERT, UPDATE, DELETE, SELECT ON SCHEMA::dbo TO db_app_writer;

-- Add app_user to writer role (only if app needs write)
EXEC sp_addrolemember 'db_app_writer', 'app_user';

-- Optional: separate read-only users for reporting
