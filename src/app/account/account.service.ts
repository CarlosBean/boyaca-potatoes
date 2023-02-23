import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './models/user.model';
import { IAccount } from './models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private resourceUrl = `${environment.API_URL}/account`;
  constructor(private http: HttpClient) {}

  login(user: Partial<IUser>): Observable<IAccount> {
    return this.http.post<IAccount>(`${this.resourceUrl}/login`, user);
  }
}
