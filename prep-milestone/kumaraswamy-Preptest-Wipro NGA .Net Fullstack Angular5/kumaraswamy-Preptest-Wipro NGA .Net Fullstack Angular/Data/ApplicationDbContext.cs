using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
