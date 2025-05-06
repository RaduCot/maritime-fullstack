using MaritimeApi.Models;
using Xunit;

namespace MaritimeApi.Tests.Models
{
    public class PortTest
    {
        [Fact]
        public void Port_CreatesSuccessfully_WithValidData()
        {
            // Arrange & Act
            var port = new Port("Port of Rotterdam", "Netherlands");

            // Assert
            Assert.NotNull(port);
            Assert.Equal("Port of Rotterdam", port.Name);
            Assert.Equal("Netherlands", port.Country);
        }

        [Fact]
        public void Port_ThrowsException_WhenNameIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new Port(null!, "Netherlands"));
        }

        [Fact]
        public void Port_ThrowsException_WhenCountryIsNull()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new Port("Port of Rotterdam", null!));
        }

        [Fact]
        public void Port_Allows_ValidData()
        {
            // Arrange
            var port = new Port("Port of Shanghai", "China")
            {
                Id = 2
            };

            // Assert
            Assert.Equal(2, port.Id);
            Assert.Equal("Port of Shanghai", port.Name);
            Assert.Equal("China", port.Country);
        }
    }
}
