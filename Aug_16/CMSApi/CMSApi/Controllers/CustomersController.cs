using CMSApi.Data;
using CMSApi.Helpers;
using CMSApi.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMSApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CmsContext _context;

        public CustomersController(CmsContext context)
        {
            _context = context;
        }

        // ✅ Add Customer
        //[HttpPost("add")]
        //public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
        //{
        //    customer.CustPassword = EncryptionHelper.Encrypt(customer.CustPassword);

        //    _context.Customers.Add(customer);
        //    await _context.SaveChangesAsync();
        //    return Ok(new { message = "Customer Added Successfully", customer });
        //}
        [HttpPost("add")]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest(new { message = "Invalid customer data" });
            }

            // Encrypt password before saving
            customer.CustPassword = EncryptionHelper.Encrypt(customer.CustPassword);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Customer Added Successfully",
                customer
            });
        }


        // ✅ Show All Customers
        [HttpGet("show")]
        public async Task<IActionResult> ShowCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            return Ok(customers);  // will now include encrypted CustPassword
        }

        // ✅ Search By Id
        [HttpGet("search/id/{id}")]
        public async Task<IActionResult> SearchById(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return NotFound("Customer not found");
            return Ok(customer);
        }

        // ✅ Search By UserName
        [HttpGet("search/username/{username}")]
        public async Task<IActionResult> SearchByUserName(string username)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustUserName == username);
            if (customer == null) return NotFound("Customer not found");
            return Ok(customer);
        }

        // ✅ Authenticate Customer
        public class AuthRequest
        {
            public string custUserName { get; set; }
            public string custPassword { get; set; }
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthRequest request)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CustUserName == request.custUserName);

            if (customer == null)
                return Unauthorized("Invalid username or password");

            var decryptedPassword = EncryptionHelper.Decrypt(customer.CustPassword);

            if (decryptedPassword != request.custPassword)
                return Unauthorized("Invalid username or password");

            return Ok(new { message = "Login successful", customer });
        }
        //[HttpPost("authenticate")]
        //public async Task<IActionResult> Authenticate([FromBody] LoginRequest request)
        //{
        //    var customer = await _context.Customers
        //        .FirstOrDefaultAsync(c => c.CustUserName == request.Username);

        //    if (customer == null)
        //        return Unauthorized("Invalid username or password");

        //    var decryptedPassword = EncryptionHelper.Decrypt(customer.CustPassword);

        //    if (decryptedPassword != request.Password)
        //        return Unauthorized("Invalid username or password");

        //    return Ok(new { message = "Login successful", customer });
        //}

    }
}
