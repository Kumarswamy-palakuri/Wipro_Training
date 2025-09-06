using CarRental.Api.Models;
using CarRental.Api.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly ICarLeaseRepository _repo;
    public CarsController(ICarLeaseRepository repo) { _repo = repo; }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailable() => Ok(await _repo.ListAvailableCarsAsync());

    [HttpGet("rented")]
    public async Task<IActionResult> GetRented() => Ok(await _repo.ListRentedCarsAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var car = await _repo.FindCarByIdAsync(id);
        return car == null ? NotFound() : Ok(car);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(Car car)
    {
        await _repo.AddCarAsync(car);
        return CreatedAtAction(nameof(GetById), new { id = car.VehicleID }, car);
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.RemoveCarAsync(id);
        return NoContent();
    }
}
