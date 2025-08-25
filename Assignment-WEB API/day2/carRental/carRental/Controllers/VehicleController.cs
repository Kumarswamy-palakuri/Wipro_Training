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
    [Route("api/vehicles")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleService _svc;
        public VehicleController(VehicleService svc) { _svc = svc; }

        [HttpPost]
        public async Task<ActionResult<Vehicle>> Add([FromBody] Vehicle v)
        {
            var created = await _svc.AddAsync(v);
            return CreatedAtAction(nameof(GetAll), new { id = created.VehicleId }, created);
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehicle>>> GetAll()
        {
            var list = await _svc.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<List<Vehicle>>> GetByType([FromRoute] string type)
        {
            var list = await _svc.GetByTypeAsync(type);
            return Ok(list);
        }

        [HttpGet("type/{type}/available/{available}")]
        public async Task<ActionResult<List<Vehicle>>> GetByTypeAndAvailability([FromRoute] string type, [FromRoute] bool available)
        {
            var list = await _svc.GetByTypeAndAvailabilityAsync(type, available);
            return Ok(list);
        }
    }
}
