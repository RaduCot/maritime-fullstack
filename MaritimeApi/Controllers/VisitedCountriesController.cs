using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaritimeApi.Data;
using MaritimeApi.Models;

namespace MaritimeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitedCountriesController(MaritimeContext context) : ControllerBase
    {
        private readonly MaritimeContext _context = context;

        private bool Validation(int id)
        {
            return _context.VisitedCountries.Any(e => e.Id == id);
        }

        // GET: api/visitedcountries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitedCountry>>> GetVisitedCountries()
        {
            return await _context.VisitedCountries.OrderBy(p => p.Id).ToListAsync();
        }

        // GET: api/visitedcountries/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VisitedCountry>> GetVisitedCountry(int id)
        {
            var visitedCountry = await _context.VisitedCountries.FindAsync(id);

            if (visitedCountry == null)
            {
                return NotFound();
            }

            return visitedCountry;
        }
    }
}