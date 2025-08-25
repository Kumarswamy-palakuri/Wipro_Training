using System.ComponentModel.DataAnnotations;

namespace Tasker.Models;

public class TaskEditViewModel
{
    public int Id { get; set; }

    [Required, StringLength(200)]
    public string Title { get; set; } = "";

    [StringLength(2000)]
    public string? Description { get; set; }
}
