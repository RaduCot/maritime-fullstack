export interface Port {
  id: number;
  name: string;
  country: string;
}

export interface Ship {
  id: number;
  name: string;
  maxSpeed: number;
}

export interface VisitedCountry {
  id: number;
  countryName: string;
}

export interface Voyage {
  id: number;
  voyageDate: string;
  departurePortId: number;
  arrivalPortId: number;
  voyageStart: string;
  voyageEnd: string;
}

export interface MaritimeState {
  ports: Port[];
  ships: Ship[];
  visitedCountries: VisitedCountry[];
  voyages: Voyage[];
  isLoading: boolean;
}
