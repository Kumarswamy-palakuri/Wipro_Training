namespace ASP_project_4_Secure_App.DTOs
{
    public record UserCreateDto(string Email, string FirstName, string LastName, string Password, string? Phone);
    public record UserReadDto(Guid Id, string Email, string FirstName, string LastName, string? Phone);
    public record UserLoginDto(string Email, string Password);
}
