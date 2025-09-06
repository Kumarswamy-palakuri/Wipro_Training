using CarRental.Api.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeasesController : ControllerBase
{
    private readonly ICarLeaseRepository _repo;
    public LeasesController(ICarLeaseRepository repo) { _repo = repo; }

    [HttpGet("active")]
    public async Task<IActionResult> Active() => Ok(await _repo.ListActiveLeasesAsync());

    [HttpGet("history")]
    public async Task<IActionResult> History() => Ok(await _repo.ListLeaseHistoryAsync());

    public record CreateLeaseDto(int CustomerID, int CarID, DateTime StartDate, DateTime EndDate, string Type);

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateLeaseDto dto)
    {
        var lease = await _repo.CreateLeaseAsync(dto.CustomerID, dto.CarID, dto.StartDate, dto.EndDate, dto.Type);
        return Ok(lease);
    }

    [Authorize]
    [HttpPost("{leaseID:int}/return")]
    public async Task<IActionResult> Return(int leaseID)
    {
        var lease = await _repo.ReturnCarAsync(leaseID);
        return Ok(lease);
    }
}
