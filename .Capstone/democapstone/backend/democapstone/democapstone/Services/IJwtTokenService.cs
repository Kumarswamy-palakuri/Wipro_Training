using democapstone.Models;

namespace democapstone.Services;

public interface IJwtTokenService
{
    string Generate(User user);
}
