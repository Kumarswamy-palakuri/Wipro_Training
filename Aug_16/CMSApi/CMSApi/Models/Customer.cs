using System.ComponentModel.DataAnnotations;

namespace CMSApi.Models
{
    public class Customer
    {
        [Key]
        public int CustId { get; set; }

        [Required]
        public string CustName { get; set; }

        [Required]
        public string CustUserName { get; set; }

        [Required]
        public string CustPassword { get; set; }

        public string? City { get; set; }
        public string? State { get; set; }
        public string? Email { get; set; }
        public string? MobileNo { get; set; }
    }
}
