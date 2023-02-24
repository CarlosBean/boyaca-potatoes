import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.accountService.token;
    const ignoredEndpoints = ['account/login'];

    const hasIgnoredEndpoint = ignoredEndpoints.some(v =>
      request.url.includes(v)
    );

    if (this.accountService.token && !hasIgnoredEndpoint) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
