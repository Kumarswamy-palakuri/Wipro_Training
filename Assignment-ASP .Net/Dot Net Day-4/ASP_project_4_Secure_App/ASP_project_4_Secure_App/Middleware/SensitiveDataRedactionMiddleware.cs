using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ASP_project_4_Secure_App.Middleware
{
    public class SensitiveDataRedactionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly HashSet<string> _fields;
        private readonly ILogger<SensitiveDataRedactionMiddleware> _logger;

        public SensitiveDataRedactionMiddleware(RequestDelegate next, IConfiguration cfg, ILogger<SensitiveDataRedactionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
            _fields = cfg.GetSection("Security:SensitiveLogging:RedactFields").Get<string[]>()?.Select(f => f.ToLowerInvariant()).ToHashSet()
                      ?? new HashSet<string>();
        }

        public async Task Invoke(HttpContext context)
        {
            // Ensure we never log raw request bodies for sensitive endpoints.
            using (_logger.BeginScope("requestId:{RequestId}", context.TraceIdentifier))
            {
                await _next(context);
            }
        }

        // If you implement request/response logging, ensure redaction based on _fields before emitting logs.
    }
}
