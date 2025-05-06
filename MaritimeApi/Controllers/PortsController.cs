using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaritimeApi.Data;
using MaritimeApi.Models;

namespace MaritimeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortsController(MaritimeContext context) : ControllerBase
    {
        private readonly MaritimeContext _context = context;

        private bool Validation(int id)
        {
            return _context.Ports.Any(e => e.Id == id);
        }

        // GET: api/ports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Port>>> GetPorts()
        {
            return await _context.Ports.OrderBy(p => p.Id).ToListAsync();
        }

        // GET: api/ports/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Port>> GetPort(int id)
        {
            var port = await _context.Ports.FindAsync(id);

            if (port == null)
            {
                return NotFound();
            }

            return port;
        }

        // POST: api/ports
        [HttpPost]
        public async Task<ActionResult<Port>> PostPort(Port port)
        {
            _context.Ports.Add(port);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPort), new { id = port.Id }, port);
        }

        // PUT: api/ports/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPort(int id, Port port)
        {
            if (id != port.Id)
            {
                return BadRequest();
            }

            _context.Entry(port).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Validation(id))
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

        // DELETE: api/ports/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePort(int id)
        {
            var port = await _context.Ports.FindAsync(id);
            if (port == null)
            {
                return NotFound();
            }

            _context.Ports.Remove(port);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}