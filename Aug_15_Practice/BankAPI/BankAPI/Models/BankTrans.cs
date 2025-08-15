using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankProject.Models
{
    public class BankTrans
    {
        [Key]
        [Column("TranId")]
        public int TranId { get; set; }
        [Column("AccountNo")]
        public int AccountNo { get; set; }
        [Column("TranAmount")]
        public decimal TranAmount { get; set; }
        [Column("TranType")]
        public string? TranType { get; set; }
    }
}
