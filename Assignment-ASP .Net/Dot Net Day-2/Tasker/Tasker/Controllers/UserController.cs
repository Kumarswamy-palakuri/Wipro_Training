using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Tasker.Data;
using Tasker.Models;

namespace Tasker.Controllers;

[Authorize] // Must be authenticated for all actions
public class UserController : Controller
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    // /User/TaskList
    public async Task<IActionResult> TaskList()
    {
        var uid = _userManager.GetUserId(User)!;
        var tasks = await _db.Tasks.AsNoTracking()
            .Where(t => t.OwnerUserId == uid)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        return View(tasks);
    }

    [HttpGet]
    public IActionResult Create() => View(new TaskEditViewModel());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(TaskEditViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        var uid = _userManager.GetUserId(User)!;
        var entity = new TaskItem
        {
            OwnerUserId = uid,
            Title = model.Title.Trim(),
            Description = model.Description?.Trim() ?? "",
            Completed = false
        };
        _db.Tasks.Add(entity);
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(TaskList));
    }

    [HttpGet]
    [Authorize(Policy = "CanEditTask")]
    public async Task<IActionResult> Edit(int id)
    {
        var uid = _userManager.GetUserId(User)!;
        var entity = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.OwnerUserId == uid);
        if (entity == null) return NotFound();

        var vm = new TaskEditViewModel { Id = entity.Id, Title = entity.Title, Description = entity.Description };
        return View(vm);
    }

    [HttpPost]
    [Authorize(Policy = "CanEditTask")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(TaskEditViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        var uid = _userManager.GetUserId(User)!;
        var entity = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == model.Id && t.OwnerUserId == uid);
        if (entity == null) return NotFound();

        entity.Title = model.Title.Trim();
        entity.Description = model.Description?.Trim() ?? "";
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(TaskList));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleComplete(int id)
    {
        var uid = _userManager.GetUserId(User)!;
        var entity = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.OwnerUserId == uid);
        if (entity == null) return NotFound();

        entity.Completed = !entity.Completed;
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(TaskList));
    }
}
