using democapstone.Models;

namespace democapstone.Services;

public interface IUserService
{
    User? Validate(string username, string password);
}
