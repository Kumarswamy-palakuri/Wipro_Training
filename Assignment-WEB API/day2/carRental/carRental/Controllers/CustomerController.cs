using carRental.Entities;
using carRental.Services;
//using CarRentalSystem.Entities;
//using CarRentalSystem.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace carRental.Controllers
{
    [ApiController]
    [Route("api/customers")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _svc;
        public CustomerController(CustomerService svc) { _svc = svc; }

        [HttpPost]
        public async Task<ActionResult<Customer>> Add([FromBody] Customer c)
        {
            var created = await _svc.AddAsync(c);
            return CreatedAtAction(nameof(GetAll), new { id = created.CustomerId }, created);
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetAll()
        {
            var list = await _svc.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Customer>>> Search([FromQuery] string? q)
        {
            var list = await _svc.SearchAsync(q);
            return Ok(list);
        }
    }
}
