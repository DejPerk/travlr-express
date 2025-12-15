import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          if (res && res.token) {
            localStorage.setItem('travlr-token', res.token);
          }
        }),
        map(res => !!res?.token)
      );
  }

  logout(): void {
    localStorage.removeItem('travlr-token');
  }

  getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
