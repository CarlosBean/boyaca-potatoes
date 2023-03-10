import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IAccount } from './models/account.model';
import { ICredential } from './models/credential.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private resourceUrl = `${environment.API_URL}/account`;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token') || '';
  }

  login(credential: Partial<ICredential>): Observable<IAccount> {
    return this.http
      .post<IAccount>(`${this.resourceUrl}/login`, credential)
      .pipe(
        map(res => {
          this.token = res.Token;
          localStorage.setItem('token', res.Token);
          return res;
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isTokenExpired(token: string): boolean {
    try {
      const encodedPayload = token.split('.')[1];
      const payload = JSON.parse(atob(encodedPayload));

      const expiryTimestamp = payload.exp;
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);

      return currentTimestamp >= expiryTimestamp;
    } catch (error) {
      console.error('an invalid JWT has been provided');
    }

    return true;
  }

  isAuthenticated(): boolean {
    if (this.token && !this.isTokenExpired(this.token)) {
      return true;
    }
    return false;
  }
}
