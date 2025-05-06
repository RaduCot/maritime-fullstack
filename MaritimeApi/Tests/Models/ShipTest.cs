using MaritimeApi.Models;
using Xunit;

namespace MaritimeApi.Tests.Models;

public class ShipTest
{
    [Fact]
    public void Ship_CreatesSuccessfully_WithValidData()
    {
        // Arrange & Act
        var ship = new Ship("Titanic", 25)
        {
            Id = 1
        };

        // Assert
        Assert.NotNull(ship);
        Assert.Equal(1, ship.Id);
        Assert.Equal("Titanic", ship.Name);
        Assert.Equal(25, ship.MaxSpeed);
    }

    [Fact]
    public void Ship_ThrowsException_WhenNameIsNull()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => new Ship(null!, 25));
    }

    [Fact]
    public void Ship_ThrowsException_WhenMaxSpeedIsNegative()
    {
        // Act & Assert
        Assert.Throws<ArgumentOutOfRangeException>(() => new Ship("Titanic", -5));
    }
}