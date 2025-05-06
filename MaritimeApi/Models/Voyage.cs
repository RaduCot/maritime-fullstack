namespace MaritimeApi.Models;

public class Voyage
{
    // Voyages (id, voyage date, voyage departure port, voyage arrival port, voyage start, voyage end)
    public int Id { get; set; }

    private DateTime _voyageDate;
    public DateTime VoyageDate
    {
        get => _voyageDate;
        set => _voyageDate = value;
    }

    private int _departurePortId;
    public int DeparturePortId
    {
        get => _departurePortId;
        set
        {
            if (value <= 0)
                throw new ArgumentOutOfRangeException(nameof(DeparturePortId), "Departure port ID must be greater than zero.");
            _departurePortId = value;
        }
    }

    private int _arrivalPortId;
    public int ArrivalPortId
    {
        get => _arrivalPortId;
        set
        {
            if (value <= 0)
                throw new ArgumentOutOfRangeException(nameof(ArrivalPortId), "Arrival port ID must be greater than zero.");
            _arrivalPortId = value;
        }
    }

    private DateTime _voyageStart;
    public DateTime VoyageStart
    {
        get => _voyageStart;
        set
        {
            if (value < VoyageDate)
                throw new ArgumentOutOfRangeException(nameof(VoyageStart), "Voyage start time cannot be before the voyage date.");
            _voyageStart = value;
        }
    }

    private DateTime _voyageEnd;
    public DateTime VoyageEnd
    {
        get => _voyageEnd;
        set
        {
            if (value < VoyageStart)
                throw new ArgumentOutOfRangeException(nameof(VoyageEnd), "Voyage end time cannot be before the voyage start time.");
            _voyageEnd = value;
        }
    }

    // Constructor without past-date validation
    public Voyage(DateTime voyageDate, int departurePortId, int arrivalPortId, DateTime voyageStart, DateTime voyageEnd)
    {
        VoyageDate = voyageDate;
        DeparturePortId = departurePortId;
        ArrivalPortId = arrivalPortId;
        VoyageStart = voyageStart;
        VoyageEnd = voyageEnd;
    }
}
