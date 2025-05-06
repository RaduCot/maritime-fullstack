namespace MaritimeApi.Models;
public class VisitedCountry
{
    // Countries that were visited in the last year (id, country name) 
    public int Id { get; set; }
    private string _countryName = string.Empty;

    public string CountryName
    {
        get => _countryName;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException(nameof(CountryName), "Country name cannot be null or whitespace.");
            _countryName = value;
        }
    }

    public VisitedCountry(string countryName)
    {
        CountryName = countryName;
    }
}
