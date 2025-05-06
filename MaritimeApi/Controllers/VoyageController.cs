using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaritimeApi.Data;
using MaritimeApi.Models;

namespace MaritimeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoyagesController(MaritimeContext context) : ControllerBase
    {
        private readonly MaritimeContext _context = context;

        private bool Validation(int id)
        {
            return _context.Voyages.Any(e => e.Id == id);
        }

        // GET: api/voyages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voyage>>> GetVoyages()
        {
            return await _context.Voyages.OrderBy(p => p.Id).ToListAsync();
        }

        // GET: api/voyages/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Voyage>> GetVoyage(int id)
        {
            var voyage = await _context.Voyages.FindAsync(id);

            if (voyage == null)
            {
                return NotFound();
            }

            return voyage;
        }

        // POST: api/voyages
        [HttpPost]
        public async Task<ActionResult<Voyage>> PostVoyage(Voyage voyage)
        {
            _context.Voyages.Add(voyage);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVoyage), new { id = voyage.Id }, voyage);
        }

        // PUT: api/voyages/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoyage(int id, Voyage voyage)
        {
            if (id != voyage.Id)
            {
                return BadRequest();
            }

            _context.Entry(voyage).State = EntityState.Modified;

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

        // DELETE: api/voyages/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoyage(int id)
        {
            var voyage = await _context.Voyages.FindAsync(id);
            if (voyage == null)
            {
                return NotFound();
            }

            _context.Voyages.Remove(voyage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}