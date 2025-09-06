using Microsoft.AspNetCore.Identity;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Add custom fields later if needed
        public string? FullName { get; set; }

    }
}
