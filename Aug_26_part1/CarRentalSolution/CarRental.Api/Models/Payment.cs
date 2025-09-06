using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental.Api.Models;

public class Payment
{
    [Key] public int PaymentID { get; set; }
    [ForeignKey(nameof(Lease))] public int LeaseID { get; set; }
    public Lease? Lease { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal Amount { get; set; }
}
