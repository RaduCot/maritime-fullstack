using MaritimeApi.Models;
using Xunit;

namespace MaritimeApi.Tests.Models;

public class VisitedCountriesTest
{
    [Fact]
    public void VisitedCountry_CreatesSuccessfully_WithValidData()
    {
        // Arrange & Act
        var visitedCountry = new VisitedCountry("Netherlands");

        // Assert
        Assert.NotNull(visitedCountry);
        Assert.Equal("Netherlands", visitedCountry.CountryName);
    }

    [Fact]
    public void VisitedCountry_ThrowsException_WhenCountryNameIsNull()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => new VisitedCountry(null!));
    }
}