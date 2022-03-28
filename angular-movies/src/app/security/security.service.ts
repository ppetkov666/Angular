import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authenticationResponse, userCredentials } from './security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + "/accounts"
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleField: string = 'role';


  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }
    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration!);
    if (expirationDate < new Date()) {
      this.logout();
      return false
    }
    return true;

  }

  getContextFromJwtToken(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return '';
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  getRole(): string {
    return this.getContextFromJwtToken(this.roleField);
  }

  login(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiUrl + "/login", userCredentials);
  }

  register(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiUrl + "/create", userCredentials);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }



  saveToken(authenticationResponse: authenticationResponse) {
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString());
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

}
