import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  JWTTOKEN,
  Titles,
} from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:8080/';

  jwtToken!: HttpHeaders;

  // SETTER
  setJwtToken(): void {
    this.jwtToken = new HttpHeaders({
      Authorization: localStorage.getItem(JWTTOKEN) + '',
    });
  }

  getEventId(): string | null {
    return localStorage.getItem('eventId');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }


  userLogin(body: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.baseUrl + 'api/user/login', body, {
      observe: 'response'
    });
  }

  createProvider(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/provider', body, {
      headers: this.jwtToken,
    });
  }

  getAllProviders(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/provider/all');
  }

  getActiveSmartMeters(): Observable<Titles> {
    return this.http.get<Titles>(this.baseUrl + 'api/smart-meter/active');
  }


  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/user/all', {
      headers: this.jwtToken,
    });
  }

  getNewSmartMeters(): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'api/smart-meter/new',
      { headers: this.jwtToken }
    );
  }

  getAllSmartMeters(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/smart-meter/all', {
      headers: this.jwtToken,
    });
  }

  changeProviderStatus(name: string, status: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/provider/change-status?name=${name}&status=${status}`, '');
  }

  changeSmartMeterStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}api/smart-meter/change-status?id=${id}&status=${status}`, '');
  }

  createUser(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/user', body);
  }

  getUserSmartMeters(userId: string, status: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/smart-meter?userId=${userId}&status=${status}`);
  }

  enrollSmartMeter(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/smart-meter/enroll', body);
  }

}
