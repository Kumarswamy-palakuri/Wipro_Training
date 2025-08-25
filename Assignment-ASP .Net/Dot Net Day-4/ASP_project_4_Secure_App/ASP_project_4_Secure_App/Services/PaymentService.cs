using ASP_project_4_Secure_App.Models;
using ASP_project_4_Secure_App.Persistence;
using ASP_project_4_Secure_App.Security;
using Microsoft.EntityFrameworkCore;
using ASP_project_4_Secure_App.DTOs;
using System.Text.Json;

namespace ASP_project_4_Secure_App.Services
{
    public record PaymentCreateDto(Guid UserId, decimal Amount, string Currency, string CardHolderName, string CardNumber, string Expiry, string Cvv);
    public record PaymentReadDto(Guid Id, Guid UserId, decimal Amount, string Currency, string CardHolderName, string CardNumberMasked, string Expiry);

    public class PaymentService
    {
        private readonly AppDbContext _db;
        private readonly CryptoService _crypto;
        private readonly HmacService _hmac;

        public PaymentService(AppDbContext db, CryptoService crypto, HmacService hmac)
        {
            _db = db; _crypto = crypto; _hmac = hmac;
        }

        public async Task<Payment> CreateAsync(PaymentCreateDto dto, CancellationToken ct)
        {
            // Ensure user exists
            var userExists = await _db.Users.AnyAsync(u => u.Id == dto.UserId, ct);
            if (!userExists) throw new InvalidOperationException("User not found");

            var p = new Payment
            {
                UserId = dto.UserId,
                Amount = dto.Amount,
                Currency = dto.Currency.ToUpperInvariant(),
                CardHolderNameEnc = _crypto.Encrypt(dto.CardHolderName),
                CardNumberEnc = _crypto.Encrypt(dto.CardNumber),
                ExpiryEnc = _crypto.Encrypt(dto.Expiry),
                CvvEnc = _crypto.Encrypt(dto.Cvv)
            };
            var canonical = JsonSerializer.Serialize(new
            {
                p.UserId,
                p.Amount,
                p.Currency,
                CardHolderName = dto.CardHolderName,
                CardNumber = dto.CardNumber,
                Expiry = dto.Expiry
            });
            p.IntegrityTag = _hmac.Compute(canonical);

            _db.Payments.Add(p);
            await _db.SaveChangesAsync(ct);
            return p;
        }

        public PaymentReadDto ToRead(Payment p)
        {
            var holder = _crypto.Decrypt(p.CardHolderNameEnc);
            var card = _crypto.Decrypt(p.CardNumberEnc);
            var expiry = _crypto.Decrypt(p.ExpiryEnc);
            var masked = card.Length >= 4 ? new string('X', Math.Max(0, card.Length - 4)) + card[^4..] : "****";
            return new PaymentReadDto(p.Id, p.UserId, p.Amount, p.Currency, holder, masked, expiry);
        }
    }
}
