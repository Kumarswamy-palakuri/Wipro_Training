using Microsoft.EntityFrameworkCore;

namespace EmployeeAdmin.Models
{
    public class AddEmployeedto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? Phone { get; set; }
        //[Precision(18, 2)]
        public decimal salary { get; set; }
    }
}
