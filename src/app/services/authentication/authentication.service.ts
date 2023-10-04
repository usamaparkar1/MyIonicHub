import { localHelpers } from 'src/app/helpers/local-helpers';
import { StorageService } from '../storage/storage.service';
import { Injectable } from '@angular/core';
import { from, of, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  currentAccessToken = null;

  constructor(private _storageService: StorageService) { }

  // Store a new access token
  storeAccessToken(accessToken: any) {
    this.currentAccessToken = accessToken;
    return from(this._storageService.set(localHelpers.accessTokenKey, accessToken));
  }

  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refreshToken = from(this._storageService.get(localHelpers.refreshTokenKey));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.value}`
            })
          }
          // return this.http.get(`${this.url}/auth/refresh`, httpOptions);
          return of(null);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  login() {}

  logout() {}
}
