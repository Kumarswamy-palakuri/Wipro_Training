// backend/Controllers/UsersController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagementSystem.Models;
using InventoryManagementSystem.Services;

namespace InventoryManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("inactive")]
        public async Task<IActionResult> GetInactive()
        {
            var users = await _userService.GetInactiveUsers();
            return Ok(users);
        }

        //[Authorize(Roles = "Admin")]
        //[HttpGet("registrations/pending")]
        //public async Task<IActionResult> GetPendingRegistrations()
        //{
        //    try
        //    {
        //        var pendingUsers = await _userService.GetPendingRegistrations();
        //        return Ok(pendingUsers);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        // backend/Controllers/UsersController.cs
        [Authorize(Roles = "Admin")]
        [HttpGet("registrations/pending")]
        public async Task<IActionResult> GetPendingRegistrations()
        {
            try
            {
                var pendingUsers = await _userService.GetPendingRegistrations();
                return Ok(pendingUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetById(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user, [FromQuery] string password)
        {
            try
            {
                var createdUser = await _userService.Create(user, password);
                return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] User user, [FromQuery] string password = null)
        {
            if (id != user.Id)
                return BadRequest();

            try
            {
                await _userService.Update(user, password);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _userService.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("request-approval")]
        public async Task<IActionResult> RequestApproval([FromBody] RoleApprovalRequest request)
        {
            var userId = int.Parse(User.Identity.Name);
            var approval = await _userService.RequestRoleApproval(userId, request.RequestedRole);

            if (approval == null)
                return BadRequest(new { message = "Unable to process approval request" });

            return Ok(approval);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("approvals/pending")]
        public async Task<IActionResult> GetPendingApprovals()
        {
            var approvals = await _userService.GetPendingApprovals();
            return Ok(approvals);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("approvals/{id}/process")]
        public async Task<IActionResult> ProcessApproval(int id, [FromBody] ApprovalProcessRequest request)
        {
            var adminId = int.Parse(User.Identity.Name);
            var result = await _userService.ProcessApproval(id, request.Status, request.Comments, adminId);

            if (!result)
                return BadRequest(new { message = "Unable to process approval" });

            return Ok(new { message = $"Approval {request.Status.ToLower()}" });
        }
    }

    public class RoleApprovalRequest
    {
        public string RequestedRole { get; set; }
    }

    public class ApprovalProcessRequest
    {
        public string Status { get; set; }
        public string Comments { get; set; }
    }
}