using CarRental.Api.Models;
using CarRental.Api.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICarLeaseRepository _repo;
    public CustomersController(ICarLeaseRepository repo) { _repo = repo; }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _repo.ListCustomersAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cust = await _repo.FindCustomerByIdAsync(id);
        return cust == null ? NotFound() : Ok(cust);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(Customer c)
    {
        await _repo.AddCustomerAsync(c);
        return Ok(c);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.RemoveCustomerAsync(id);
        return NoContent();
    }
}
