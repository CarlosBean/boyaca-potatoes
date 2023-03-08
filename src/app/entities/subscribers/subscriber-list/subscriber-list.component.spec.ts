import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import es from '../../../../assets/i18n/es.json';
import en from '../../../../assets/i18n/en.json';

import { SubscriberListComponent } from './subscriber-list.component';

describe('SubscriberListComponent', () => {
  let component: SubscriberListComponent;
  let fixture: ComponentFixture<SubscriberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SubscriberListComponent,
        HttpClientTestingModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
