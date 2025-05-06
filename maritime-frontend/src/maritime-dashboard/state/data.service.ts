import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaritimeDataService {
  private apiUrl = 'http://localhost:5066/api';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch data for ports
  getPorts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ports`);
  }

  // Fetch specific port by ID
  getPortById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ports/${id}`);
  }

  // Fetch data for ships
  getShips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ships`);
  }

  // Fetch specific ship by ID
  getShipById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ships/${id}`);
  }

  // Fetch data for voyages
  getVoyages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Voyages`);
  }

  // Fetch specific voyage by ID
  getVoyageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Voyages/${id}`);
  }

  // Fetch data for countries
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/VisitedCountries`);
  }

  // Fetch specific country by ID
  getCountryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/VisitedCountries/${id}`);
  }



  // Delete a port by ID
  deletePort(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Ports/${id}`);
  }
  // Delete a ship by ID
  deleteShip(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Ships/${id}`);
  }
  // Delete a voyage by ID
  deleteVoyage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Voyages/${id}`);
  }
   // Edit a port by ID
  editPort(id: number, port: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Ports/${id}`, port);
  }
  // Edit a ship by ID
  editShip(id: number, ship: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Ships/${id}`, ship);
  }
  // Edit a voyage by ID
  editVoyage(id: number, voyage: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Voyages/${id}`, voyage);
  }
    // Add a new port
  addPort(port: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Ports`, port);
  }
  // Add a new ship
  addShip(ship: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Ships`, ship);
  }
  // Add a new voyage
  addVoyage(voyage: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Voyages`, voyage);
  }
}
