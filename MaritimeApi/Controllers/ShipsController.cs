using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaritimeApi.Data;
using MaritimeApi.Models;

namespace MaritimeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipsController(MaritimeContext context) : ControllerBase
    {
        private readonly MaritimeContext _context = context;

        private bool Validation(int id)
        {
            return _context.Ships.Any(e => e.Id == id);
        }

        // GET: api/ships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ship>>> GetShips()
        {
            return await _context.Ships.OrderBy(p => p.Id).ToListAsync();
        }

        // GET: api/ships/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Ship>> GetShip(int id)
        {
            var ship = await _context.Ships.FindAsync(id);

            if (ship == null)
            {
                return NotFound();
            }

            return ship;
        }

        // POST: api/ships
        [HttpPost]
        public async Task<ActionResult<Ship>> PostShip(Ship ship)
        {
            _context.Ships.Add(ship);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShip), new { id = ship.Id }, ship);
        }

        // PUT: api/ships/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShip(int id, Ship ship)
        {
            if (id != ship.Id)
            {
                return BadRequest();
            }

            _context.Entry(ship).State = EntityState.Modified;

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

        // DELETE: api/ships/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShip(int id)
        {
            var ship = await _context.Ships.FindAsync(id);
            if (ship == null)
            {
                return NotFound();
            }

            _context.Ships.Remove(ship);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
