using Microsoft.EntityFrameworkCore;
using MaritimeApi.Models;

namespace MaritimeApi.Data
{
    public class MaritimeContext(DbContextOptions<MaritimeContext> options) : DbContext(options)
    {
        public DbSet<Ship> Ships { get; set; }
        public DbSet<Voyage> Voyages { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<VisitedCountry> VisitedCountries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Voyage>().Property(v => v.VoyageDate)
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                );

            modelBuilder.Entity<Voyage>().Property(v => v.VoyageStart)
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                );

            modelBuilder.Entity<Voyage>().Property(v => v.VoyageEnd)
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                );
        }
    }
}
