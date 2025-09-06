using InventoryManagementSystem.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Policy = "RequireAdmin")]
    public class AdminController : ControllerBase
    {
        private readonly UserService _userService;

        public AdminController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("approvals")]
        public IActionResult GetApprovals()
        {
            return Ok(_userService.GetPendingApprovals());
        }

        [HttpPost("approvals/{id}/approve")]
        public IActionResult Approve(int id, [FromBody] ApproveDto dto)
        {
            _userService.Approve(id, dto.Role);
            return Ok();
        }

        [HttpPost("approvals/{id}/reject")]
        public IActionResult Reject(int id)
        {
            _userService.Reject(id);
            return Ok();
        }
    }

    public class ApproveDto
    {
        public string Role { get; set; } = string.Empty;
    }
}