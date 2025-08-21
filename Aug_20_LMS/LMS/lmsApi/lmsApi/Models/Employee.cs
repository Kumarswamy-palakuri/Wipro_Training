using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lmsApi.Models
{
    public class Employee
    {
        [Column("EmpId")]
        [Key]
        public int EmpId { get; set; }
        [Column("EmployName")]
        public string? EmployName { get; set; }

        [Column("MgrId")]
        public int? MgrId { get; set; }

        [Column("LeaveAvail")]
        public int LeaveAvail { get; set; }

        [Column("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Column("Email")]
        public string? Email { get; set; }

        [Column("Mobile")]
        public string? Mobile { get; set; }
    }
}
