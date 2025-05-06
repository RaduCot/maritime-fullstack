namespace MaritimeApi.Models;
public class Port
{
    public int Id { get; set; }

    private string _name = string.Empty;
    public string Name
    {
        get => _name;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException(nameof(Name), "Name cannot be null or whitespace.");
            _name = value;
        }
    }

    private string _country = string.Empty;
    public string Country
    {
        get => _country;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException(nameof(Country), "Country cannot be null or whitespace.");
            _country = value;
        }
    }

    public Port(string name, string country)
    {
        Name = name;
        Country = country;
    }
}