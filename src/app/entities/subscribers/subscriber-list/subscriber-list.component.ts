import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberService } from '../subscriber.service';
import { IPageParams } from 'src/app/core/models/page-params.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { ISubscriber } from '../subscriber.model';
import {
  catchError,
  concatMap,
  EMPTY,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IConfirmDialog } from 'src/app/core/models/confirm-dialog.model';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
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

  constructor(
    private subsService: SubscriberService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => this.getSubscribersByPage())
      )
      .subscribe(result => (this.data = result));
  }

  getSubscribersByPage() {
    this.isLoadingResults = true;

    const params: IPageParams = {
      page: this.paginator.pageIndex + 1,
      count: this.pageSize,
    };

    return this.subsService.getAllSubscribers(params).pipe(
      catchError(() => of(null)),
      map(result => {
        this.isLoadingResults = false;

        if (result === null) {
          return [];
        }

        this.resultsLength = result.Count;
        return result.Data;
      })
    );
  }

  openUpdatePage(id: number) {
    this.router.navigate(['dashboard', 'subscribers', id]);
  }

  openDeleteDialog(id: number) {
    const data: IConfirmDialog = {
      title: 'Delete item',
      description: 'Are you sure you want to delete this item?',
      buttonLabel: 'Delete',
      icon: 'delete',
    };

    this.dialog
      .open(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(
        concatMap(res => (res ? this.subsService.deleteSub(id) : EMPTY)),
        concatMap(() => this.getSubscribersByPage())
      )
      .subscribe(result => {
        this.data = result;
        this.snackbar.open('It has been successfully deleted.', 'Deleted', {
          duration: 2500,
        });
      });
  }
}
