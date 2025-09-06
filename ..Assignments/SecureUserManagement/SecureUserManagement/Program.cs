using Microsoft.AspNetCore.Builder;


// DTOs used by minimal API
public record UserRegisterDto(string Username, string Password, string SensitiveJson);
public record UserLoginDto(string Username, string Password);
```


---


--- tests/SecureUserManagement.Tests/UserServiceTests.cs


```csharp
using Xunit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using SecureUserManagement.Repositories;
using SecureUserManagement.Services;


public class UserServiceTests
{
private readonly IUserService _svc;
private readonly ICryptoService _crypto;


public UserServiceTests()
{
var inMemorySettings = new Dictionary<string, string> {
{ "Crypto:AesKeyBase64", "bXlfMTZfYmFzZV9rZXlfZm9yX2RlbW8=" }
};
var cfg = new ConfigurationBuilder().AddInMemoryCollection(inMemorySettings).Build();
_crypto = new CryptoService(cfg);
var repo = new InMemoryUserRepository();
_svc = new UserService(repo, _crypto, new NullLogger<UserService>());
}


[Fact]
public async Task RegisterAndAuthenticate_Succeeds()
{
var username = "alice";
var password = "P@ssw0rd";
var details = "{\"email\":\"alice@example.com\"}";


await _svc.RegisterAsync(username, password, details);
var user = await _svc.AuthenticateAsync(username, password);
Assert.NotNull(user);
var decrypted = _crypto.Decrypt(user!.EncryptedDetails!);
Assert.Contains("alice@example.com", decrypted);
}


[Fact]
public async Task WrongPassword_Fails()
{
var username = "bob";
var password = "12345";
await _svc.RegisterAsync(username, password, "{}");
var user = await _svc.AuthenticateAsync(username, "wrong");
Assert.Null(user);
}
}

