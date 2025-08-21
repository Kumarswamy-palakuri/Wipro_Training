using lmsApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lmsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveHistoriesController : ControllerBase
    {
        private readonly LmsDbContext _context;

        public LeaveHistoriesController(LmsDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistories()
        {
            return await _context.LeaveHistories.ToListAsync();
        }

        [HttpGet("leaveHistory/{empId}")]
        public async Task<ActionResult<IEnumerable<LeaveHistory>>> GetLeaveHistories(int empId)
        {
            var lh = await _context.LeaveHistories.Where(x => x.EmpId == empId).ToListAsync();
            return lh;
        }

        // GET: api/LeaveHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveHistory>> GetLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistories.FindAsync(id);

            if (leaveHistory == null)
            {
                return NotFound();
            }

            return leaveHistory;
        }

        // PUT: api/LeaveHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveHistory(int id, LeaveHistory leaveHistory)
        {
            if (id != leaveHistory.LeaveId)
            {
                return BadRequest();
            }

            _context.Entry(leaveHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveHistoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LeaveHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> ApplyLeave(LeaveHistory leaveHistory)
        {
            int ms = leaveHistory.LeaveEndDate.Millisecond - leaveHistory.LeaveStartDate.Millisecond;
            int days = (ms / (1000 * 60 * 60 * 24));
            days++;
            leaveHistory.NoOfDays = days;
            leaveHistory.LeaveStatus = "PENDING";
            _context.LeaveHistories.Add(leaveHistory);
            await _context.SaveChangesAsync();
            return "Leave Applied Succesfully...";

            //return CreatedAtAction("GetLeaveHistory", new { id = leaveHistory.LeaveId }, leaveHistory);
        }

        // DELETE: api/LeaveHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveHistory(int id)
        {
            var leaveHistory = await _context.LeaveHistories.FindAsync(id);
            if (leaveHistory == null)
            {
                return NotFound();
            }

            _context.LeaveHistories.Remove(leaveHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeaveHistoryExists(int id)
        {
            return _context.LeaveHistories.Any(e => e.LeaveId == id);
        }
    }
}