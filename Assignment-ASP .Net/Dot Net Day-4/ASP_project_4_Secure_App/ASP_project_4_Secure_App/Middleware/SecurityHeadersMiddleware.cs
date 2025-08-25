using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ASP_project_4_Secure_App.Middleware
{
    public class SecurityHeadersMiddleware
    {
        private readonly RequestDelegate _next;
        public SecurityHeadersMiddleware(RequestDelegate next) => _next = next;

        public async Task Invoke(HttpContext context)
        {
            var h = context.Response.Headers;
            h["X-Content-Type-Options"] = "nosniff";
            h["X-Frame-Options"] = "DENY";
            h["Referrer-Policy"] = "no-referrer";
            h["X-XSS-Protection"] = "0"; // modern browsers; use CSP
            h["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'; object-src 'none'";
            h["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()";
            await _next(context);
        }
    }
}
