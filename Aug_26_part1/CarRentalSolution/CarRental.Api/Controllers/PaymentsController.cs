using CarRental.Api.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace CarRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly ICarLeaseRepository _repo;
    public PaymentsController(ICarLeaseRepository repo) { _repo = repo; }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Record(int leaseID, decimal amount)
    {
        await _repo.RecordPaymentAsync(leaseID, amount);
        return Ok();
    }

    [HttpGet("customer/{customerID:int}")]
    public async Task<IActionResult> History(int customerID)
      => Ok(await _repo.GetPaymentHistoryByCustomerAsync(customerID));

    [HttpGet("revenue")]
    public async Task<IActionResult> Revenue()
      => Ok(new { total = await _repo.GetTotalRevenueAsync() });
}

