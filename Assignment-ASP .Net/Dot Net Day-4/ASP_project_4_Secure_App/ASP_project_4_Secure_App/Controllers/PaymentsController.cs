using ASP_project_4_Secure_App.Persistence;
using ASP_project_4_Secure_App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ASP_project_4_Secure_App.Controllers
{
    [ApiController]
    [Route("api/payments")]
    [Authorize(Roles = "User,Admin")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _payments;
        private readonly AppDbContext _db;

        public PaymentsController(PaymentService payments, AppDbContext db)
        {
            _payments = payments; _db = db;
        }

        [HttpPost]
        public async Task<ActionResult> Create(PaymentCreateDto dto, CancellationToken ct)
        {
            var p = await _payments.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(Get), new { id = p.Id }, _payments.ToRead(p));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> Get(Guid id, CancellationToken ct)
        {
            var p = await _db.Payments.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id, ct);
            if (p == null) return NotFound();
            return Ok(_payments.ToRead(p));
        }

        //[HttpGet("me")]
        //public async Task<ActionResult> GetMyPayments(CancellationToken ct)
        //{
        //    var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        //    var payments = await _db.Payments
        //                            .AsNoTracking()
        //                            .Where(p => p.UserId == userId)
        //                            .ToListAsync(ct);

        //    return Ok(payments.Select(p => _payments.ToRead(p)));
        //}
    }
}
