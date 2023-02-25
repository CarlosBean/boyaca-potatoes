import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/account/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbar: MatSnackBar,
    private accountService: AccountService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = err.error.error || err.statusText;
        let snackbarLabel = 'Error';

        if (err.status === 401) {
          this.accountService.logout();
          errorMessage = 'your session has expired';
          snackbarLabel = 'Info';
        }

        this.snackbar.open(errorMessage, snackbarLabel, { duration: 2500 });
        return throwError(() => err);
      })
    );
  }
}
