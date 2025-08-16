using CMSApi.Data;
using CMSApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly CmsContext _context;

        public WalletController(CmsContext context)
        {
            _context = context;
        }

        // GET: api/Wallet/customer/5
        [HttpGet("customer/{custId}")]
        public async Task<ActionResult<IEnumerable<Wallet>>> GetWalletsByCustomer(int custId)
        {
            return await _context.Wallets
                .Include(w => w.Customer)
                .Where(w => w.CustId == custId)
                .ToListAsync();
        }

        // GET: api/Wallet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wallet>> GetWallet(int id)
        {
            var wallet = await _context.Wallets
                .Include(w => w.Customer)
                .FirstOrDefaultAsync(w => w.WalletId == id);

            if (wallet == null)
            {
                return NotFound();
            }

            return wallet;
        }
    }
}