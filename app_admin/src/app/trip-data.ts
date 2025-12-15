import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private baseUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // helper to attach JWT token to requests
  private authOptions() {
    const token = localStorage.getItem('travlr-token');
    if (!token) {
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getTrips(): Observable<Trip[]> {
    console.log('Requesting trips from', this.baseUrl);
    // trips list can stay public
    return this.http.get<Trip[]>(this.baseUrl);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip, this.authOptions());
  }

  updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/${id}`, trip, this.authOptions());
  }

  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${code}`, this.authOptions());
  }
}
