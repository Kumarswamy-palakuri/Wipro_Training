using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMSApi.Models
{
    public class Wallet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WalletId { get; set; }

        [Required]
        [ForeignKey("Customer")]
        public int CustId { get; set; }

        [Required]
        [StringLength(30)]
        public string WalletType { get; set; }

        [Required]
        [Column(TypeName = "decimal(9,2)")]
        public decimal WalletAmount { get; set; }

        // Navigation property
        public Customer? Customer { get; set; }
    }
}