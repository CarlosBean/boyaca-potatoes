import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberService } from '../subscriber.service';
import { IPageParams } from 'src/app/core/models/page-params.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { ISubscriber } from '../subscriber.model';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './subscriber-list.component.html',
})
export class SubscriberListComponent implements AfterViewInit {
  isLoadingResults = true;
  resultsLength = 0;
  data: ISubscriber[] = [];
  pageSize = 10;

  properties: (keyof ISubscriber)[] = [
    'Name',
    'JobTitle',
    'Area',
    'CountryName',
    'PhoneNumber',
  ];

  displayedColumns: string[] = [...this.properties, 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private subscriberService: SubscriberService) {}

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => this.getSubscribersByPage()),
        map(result => {
          this.isLoadingResults = false;

          if (result === null) {
            return [];
          }

          this.resultsLength = result.Count;
          return result.Data;
        })
      )
      .subscribe(result => (this.data = result));
  }

  getSubscribersByPage() {
    this.isLoadingResults = true;
    const params: IPageParams = {
      page: this.paginator.pageIndex + 1,
      count: this.pageSize,
    };

    return this.subscriberService
      .getAllSubscribers(params)
      .pipe(catchError(() => of(null)));
  }

  openUpdateDialog(id: number) {}

  openDeleteDialog(id: number) {}
}
