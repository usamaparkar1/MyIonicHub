import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private _http: HttpClient,
  ) {}
    
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    });
  }

  get(endpoint: string, params?: any): Observable<any> {
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams({ fromObject: params })
    };
    return this._http.get(`${environment.server}${endpoint}`, options);
  }

  post(endpoint: string, data: any): Observable<any> {
    const options = {
      headers: this.getHeaders()
    };
    return this._http.post(`${environment.server}${endpoint}`, data, options);
  }

  put(endpoint: string, data: any): Observable<any> {
    const options = {
      headers: this.getHeaders()
    };
    return this._http.put(`${environment.server}${endpoint}`, data, options);
  }

  delete(endpoint: string): Observable<any> {
    const options = {
      headers: this.getHeaders()
    };
    return this._http.delete(`${environment.server}${endpoint}`, options);
  }
}