import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import es from '../../../../assets/i18n/es.json';
import en from '../../../../assets/i18n/en.json';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            en,
            es,
          },
          translocoConfig: {
            availableLangs: ['en', 'es'],
            defaultLang: 'es',
          },
          preloadLangs: true,
        }),
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
