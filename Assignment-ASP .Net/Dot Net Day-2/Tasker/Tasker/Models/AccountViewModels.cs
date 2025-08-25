using System.ComponentModel.DataAnnotations;

namespace Tasker.Models;

public class RegisterViewModel
{
    [Required, EmailAddress, MaxLength(256)]
    public string Email { get; set; } = "";

    [Required, DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 8)]
    public string Password { get; set; } = "";

    [Required, DataType(DataType.Password)]
    [Compare(nameof(Password))]
    public string ConfirmPassword { get; set; } = "";
}

public class LoginViewModel
{
    [Required, EmailAddress]
    public string Email { get; set; } = "";

    [Required, DataType(DataType.Password)]
    public string Password { get; set; } = "";

    public bool RememberMe { get; set; }
}
