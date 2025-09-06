namespace CarRentals.Models
{
    public interface IAuthService
    {
        Task<string> Authenticate(string username, string password);
    }

}
