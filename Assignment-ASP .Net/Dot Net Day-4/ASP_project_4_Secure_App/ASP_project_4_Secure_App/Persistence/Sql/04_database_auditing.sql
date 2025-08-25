USE master;
GO

-- Server audit target to file (or to Azure blob in managed environments)
IF NOT EXISTS (SELECT * FROM sys.server_audits WHERE name = 'SecureApp_Audit')
BEGIN
    CREATE SERVER AUDIT [SecureApp_Audit]
    TO FILE (FILEPATH = 'D:\SqlAudits\', MAXSIZE = 1 GB, MAX_ROLLOVER_FILES = 50)
    WITH (ON_FAILURE = CONTINUE);
END
GO

ALTER SERVER AUDIT [SecureApp_Audit] WITH (STATE = ON);
GO

USE SecureAppDb;
GO

IF NOT EXISTS (SELECT * FROM sys.database_audit_specifications WHERE name = 'SecureAppDb_AuditSpec')
BEGIN
    CREATE DATABASE AUDIT SPECIFICATION [SecureAppDb_AuditSpec]
    FOR SERVER AUDIT [SecureApp_Audit]
    ADD (SELECT ON OBJECT::dbo.Users BY [public]),
    ADD (SELECT, INSERT, UPDATE, DELETE ON OBJECT::dbo.Payments BY [public]),
    ADD (FAILED_LOGIN_GROUP)
    WITH (STATE = ON);
END
GO
