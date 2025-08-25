using ASP_project_4_Secure_App.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace ASP_project_4_Secure_App.Services
{
    // Optional EF-backed audit entity:
    // public class AuditEvent
    // {
    //     public Guid Id { get; set; }
    //     public DateTimeOffset Timestamp { get; set; }
    //     public string ActorId { get; set; } = default!;
    //     public string ActorRole { get; set; } = default!;
    //     public string Action { get; set; } = default!;
    //     public string Resource { get; set; } = default!;
    //     public string Result { get; set; } = default!;
    //     public string? Ip { get; set; }
    //     public string? UserAgent { get; set; }
    //     public string? DetailsJson { get; set; } // sanitized payload
    // }

    public class AuditService
    {
        private readonly AppDbContext _db;
        private readonly ILogger<AuditService> _logger;

        // Redaction: fields to remove from structured details
        private static readonly HashSet<string> SensitiveFields = new(StringComparer.OrdinalIgnoreCase)
        {
            "password","passwordHash","passwordSalt","cardNumber","cvv","token","authorization",
            "ssn","pan","expiry","otp","secret","apiKey","accessToken","refreshToken"
        };

        public AuditService(AppDbContext db, ILogger<AuditService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task LogAsync(
            string action,
            string resource,
            string result,
            string? actorId = null,
            string? actorRole = null,
            string? ip = null,
            string? userAgent = null,
            object? details = null,
            CancellationToken ct = default)
        {
            // Sanitize details for logs and persistence
            var sanitized = Sanitize(details);

            using (_logger.BeginScope(new Dictionary<string, object?>
            {
                ["action"] = action,
                ["resource"] = resource,
                ["result"] = result,
                ["actorId"] = actorId,
                ["actorRole"] = actorRole,
                ["ip"] = ip
            }))
            {
                _logger.LogInformation("Audit: {Action} on {Resource} -> {Result}", action, resource, result);
            }

            // Optional: persist via EF if you add AuditEvent DbSet and migration
            // var evt = new AuditEvent
            // {
            //     Id = Guid.NewGuid(),
            //     Timestamp = DateTimeOffset.UtcNow,
            //     ActorId = actorId ?? "anonymous",
            //     ActorRole = actorRole ?? "unknown",
            //     Action = action,
            //     Resource = resource,
            //     Result = result,
            //     Ip = ip,
            //     UserAgent = userAgent,
            //     DetailsJson = sanitized is null ? null : JsonSerializer.Serialize(sanitized)
            // };
            // _db.Add(evt);
            // await _db.SaveChangesAsync(ct);
            await Task.CompletedTask;
        }

        public async Task LogAuthAsync(string result, string? actorId, string? ip, string? userAgent, CancellationToken ct = default)
            => await LogAsync("auth.login", "user", result, actorId, null, ip, userAgent, null, ct);

        public async Task LogAccessAsync(string resource, string result, string? actorId, string? role, string? ip, CancellationToken ct = default)
            => await LogAsync("resource.access", resource, result, actorId, role, ip, null, null, ct);

        public async Task LogDataChangeAsync(string resource, string result, string? actorId, string? role, object? delta, CancellationToken ct = default)
            => await LogAsync("data.change", resource, result, actorId, role, null, null, delta, ct);

        private static object? Sanitize(object? obj)
        {
            if (obj is null) return null;

            // Convert to mutable dictionary via serialization to avoid reflection complexity
            var json = JsonSerializer.Serialize(obj);
            var dict = JsonSerializer.Deserialize<Dictionary<string, object?>>(json);
            if (dict is null) return null;

            var sanitized = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
            foreach (var kv in dict)
            {
                if (SensitiveFields.Contains(kv.Key))
                {
                    sanitized[kv.Key] = "***REDACTED***";
                }
                else
                {
                    // If nested object or array, re-serialize to plain string to avoid deep PII leakage
                    if (kv.Value is JsonElement je)
                    {
                        sanitized[kv.Key] = SanitizeJsonElement(je);
                    }
                    else
                    {
                        sanitized[kv.Key] = kv.Value;
                    }
                }
            }
            return sanitized;
        }

        private static object? SanitizeJsonElement(JsonElement el)
        {
            switch (el.ValueKind)
            {
                case JsonValueKind.Object:
                    var dict = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
                    foreach (var prop in el.EnumerateObject())
                    {
                        if (SensitiveFields.Contains(prop.Name))
                            dict[prop.Name] = "***REDACTED***";
                        else
                            dict[prop.Name] = SanitizeJsonElement(prop.Value);
                    }
                    return dict;
                case JsonValueKind.Array:
                    var list = new List<object?>();
                    foreach (var item in el.EnumerateArray())
                        list.Add(SanitizeJsonElement(item));
                    return list;
                case JsonValueKind.String:
                    return el.GetString();
                case JsonValueKind.Number:
                    return el.GetDouble();
                case JsonValueKind.True:
                case JsonValueKind.False:
                    return el.GetBoolean();
                case JsonValueKind.Null:
                case JsonValueKind.Undefined:
                default:
                    return null;
            }
        }
    }
}
