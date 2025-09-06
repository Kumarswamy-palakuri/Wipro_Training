using System.ComponentModel.DataAnnotations;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        public bool RememberMe { get; set; }
    }
}
