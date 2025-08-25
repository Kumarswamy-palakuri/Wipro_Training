using ASP_project_4_Secure_App.DTOs;
using FluentValidation;

namespace ASP_project_4_Secure_App.Validators
{
    public class UserCreateValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(128);
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(64);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(64);
            RuleFor(x => x.Password).NotEmpty().MinimumLength(12)
                .Matches("[A-Z]").WithMessage("Must contain uppercase")
                .Matches("[a-z]").WithMessage("Must contain lowercase")
                .Matches("[0-9]").WithMessage("Must contain digit")
                .Matches("[^a-zA-Z0-9]").WithMessage("Must contain special char");
        }
    }

    public class UserLoginValidator : AbstractValidator<UserLoginDto>
    {
        public UserLoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
