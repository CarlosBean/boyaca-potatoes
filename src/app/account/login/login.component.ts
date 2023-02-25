import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AccountService } from '../account.service';
import { catchError, EMPTY, finalize, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  hide = true;
  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private account: AccountService,
    private router: Router
  ) {}

  login() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.account
      .login(this.form.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false)),
        catchError((err: HttpErrorResponse) => {
          this.error = err.error.error;
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.error = '';
        this.router.navigate(['dashboard']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
