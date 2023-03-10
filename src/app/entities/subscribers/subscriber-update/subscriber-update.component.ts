import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubscriberService } from '../subscriber.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, Subject, takeUntil } from 'rxjs';
import { PickSubscriber, ISubscriber } from '../subscriber.model';
import { CountryService } from '../../countries/country.service';
import { ICountry } from '../../countries/country.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@Component({
  selector: 'app-subscriber-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    TranslocoRootModule,
  ],
  templateUrl: './subscriber-update.component.html',
})
export class SubscriberUpdateComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  subscriber!: ISubscriber;

  saveloading = false;

  countries: ICountry[] = [];

  form = this.fb.nonNullable.group({
    Name: ['', [Validators.required]],
    Email: ['', [Validators.email]],
    CountryCode: ['', [Validators.required]],
    PhoneNumber: [''],
    JobTitle: [''],
    Area: [''],
  });

  constructor(
    private fb: FormBuilder,
    private subsService: SubscriberService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initialRequests()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.countries = res.countries.Data;

        if (res.subscriber) {
          this.subscriber = res.subscriber;
          this.patchForm(res.subscriber);
        }
      });
  }

  initialRequests() {
    const params = this.route.snapshot.params;
    const id = params['id'];

    const requests$ = {
      countries: this.countryService.getAllCountries({ count: 255 }),
      subscriber: Number(id) ? this.subsService.getSubscriber(id) : of(null),
    };

    return forkJoin(requests$);
  }

  goBack() {
    this.location.back();
  }

  patchForm(data: PickSubscriber) {
    this.form.patchValue({
      Name: data.Name,
      Email: data.Email,
      CountryCode: data.CountryCode,
      PhoneNumber: data.PhoneNumber,
      JobTitle: data.JobTitle,
      Area: data.Area,
    });
  }

  buildPayload(): PickSubscriber {
    const submitted = this.form.value;

    const body: PickSubscriber = {
      Name: submitted.Name,
      Email: submitted.Email,
      CountryCode: submitted.CountryCode,
      PhoneNumber: submitted.PhoneNumber,
      JobTitle: submitted.JobTitle,
      Area: submitted.Area,
      Topics: [],
    };

    if (this.subscriber?.Id) {
      body.Id = this.subscriber?.Id;
    }

    return body;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload = this.buildPayload();
    const action = this.subscriber ? 'updateSubscriber' : 'createOneSubscriber';

    this.saveloading = true;

    this.subsService[action](payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.saveloading = false;
        this.goBack();
        this.snackbar.open('It has been saved successfully.', 'Saved', {
          duration: 2500,
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
