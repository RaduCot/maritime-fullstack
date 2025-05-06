using MaritimeApi.Models;
using Xunit;

namespace MaritimeApi.Tests.Models
{
    public class VoyageTest
    {
        [Fact]
        public void Voyage_CreatesSuccessfully_WithValidData()
        {
            var dummyDate = DateTime.Now.AddDays(1).Date;
            // Arrange & Act
            var voyage = new Voyage(dummyDate, 1, 2, DateTime.Now.AddDays(1).AddHours(1), DateTime.Now.AddDays(1).AddHours(5));

            // Assert
            Assert.NotNull(voyage);
            Assert.Equal(dummyDate, voyage.VoyageDate.Date);
            Assert.Equal(1, voyage.DeparturePortId);
            Assert.Equal(2, voyage.ArrivalPortId);
            Assert.Equal(DateTime.Now.AddDays(1).AddHours(1).Date, voyage.VoyageStart.Date);
            Assert.Equal(DateTime.Now.AddDays(1).AddHours(5).Date, voyage.VoyageEnd.Date);
        }

        [Fact]
        public void Voyage_ThrowsException_WhenDeparturePortIdIsInvalid()
        {
            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => new Voyage(DateTime.Now.AddDays(1), 0, 2, DateTime.Now.AddDays(1).AddHours(1), DateTime.Now.AddDays(1).AddHours(5)));
        }

        [Fact]
        public void Voyage_ThrowsException_WhenArrivalPortIdIsInvalid()
        {
            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => new Voyage(DateTime.Now.AddDays(1), 1, 0, DateTime.Now.AddDays(1).AddHours(1), DateTime.Now.AddDays(1).AddHours(5)));
        }

        [Fact]
        public void Voyage_ThrowsException_WhenVoyageStartIsBeforeVoyageDate()
        {
            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => new Voyage(DateTime.Now.AddDays(1), 1, 2, DateTime.Now, DateTime.Now.AddDays(1).AddHours(5)));
        }

        [Fact]
        public void Voyage_ThrowsException_WhenVoyageEndIsBeforeVoyageStart()
        {
            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => new Voyage(DateTime.Now.AddDays(1), 1, 2, DateTime.Now.AddDays(1).AddHours(5), DateTime.Now.AddDays(1).AddHours(1)));
        }
    }
}