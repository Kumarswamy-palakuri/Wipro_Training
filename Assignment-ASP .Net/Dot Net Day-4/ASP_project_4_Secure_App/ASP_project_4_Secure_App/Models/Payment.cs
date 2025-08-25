using System.ComponentModel.DataAnnotations;

namespace ASP_project_4_Secure_App.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required, MaxLength(3)]
        public string Currency { get; set; } = "INR";

        // Application-level encrypted fields
        public string CardHolderNameEnc { get; set; } = default!;
        public string CardNumberEnc { get; set; } = default!;
        public string ExpiryEnc { get; set; } = default!;
        public string CvvEnc { get; set; } = default!;

        // Integrity tag (HMAC over canonical JSON of sensitive fields + Id)
        public string IntegrityTag { get; set; } = default!;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
