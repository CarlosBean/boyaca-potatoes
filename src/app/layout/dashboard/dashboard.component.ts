import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    RouterModule,
    TranslocoRootModule,
    MatRippleModule,
  ],
})
export class DashboardComponent implements OnInit {
  activeLang!: string;
  availableLangs!: string[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.availableLangs = this.translocoService.getAvailableLangs() as string[];
    this.activeLang = this.translocoService.getActiveLang();
  }

  changeLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
