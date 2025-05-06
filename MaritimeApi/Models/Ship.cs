namespace MaritimeApi.Models;
public class Ship
{
    // Ships (id, ship name, ship max speed)
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

    private int _maxSpeed;
    public int MaxSpeed
    {
        get => _maxSpeed;
        set
        {
            if (value < 0)
                throw new ArgumentOutOfRangeException(nameof(MaxSpeed), "Max speed cannot be negative.");
            _maxSpeed = value;
        }
    }


    public Ship(string name, int maxSpeed)
    {
        Name = name;
        MaxSpeed = maxSpeed;
    }
}
