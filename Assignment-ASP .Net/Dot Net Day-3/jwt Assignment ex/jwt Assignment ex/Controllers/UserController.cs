using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SecureApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet("profile")]
        [Authorize]
        public IActionResult Profile()
        {
            return Ok(new { Message = "This is a protected user profile" });
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public IActionResult Admin()
        {
            return Ok(new { Message = "Only admins can access this" });
        }
    }
}