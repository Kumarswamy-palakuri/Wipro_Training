using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BankProject.Models
{
    public class Login
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }


    }
}
