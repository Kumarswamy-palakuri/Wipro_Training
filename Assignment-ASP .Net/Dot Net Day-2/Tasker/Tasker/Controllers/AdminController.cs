using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tasker.Data;

namespace Tasker.Controllers;

[Authorize(Policy = "AdminOnly")]
public class AdminController : Controller
{
    private readonly ApplicationDbContext _db;
    public AdminController(ApplicationDbContext db) => _db = db;

    // /Admin/ManageTasks
    public async Task<IActionResult> ManageTasks()
    {
        var tasks = await _db.Tasks.AsNoTracking().OrderByDescending(t => t.CreatedAt).ToListAsync();
        return View(tasks);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.Tasks.FindAsync(id);
        if (entity != null)
        {
            _db.Tasks.Remove(entity);
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(ManageTasks));
    }
}
