import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberService } from '../subscriber.service';
import { IPageParams } from 'src/app/core/models/page-params.model';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscriber } from '../subscriber.model';

type SubscriberType = ISubscriber & { action: string };

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [CommonModule, CdkTableModule, MatIconModule],
  templateUrl: './subscriber-list.component.html',
})
export class SubscriberListComponent implements OnInit {
  dataSource: any;
  displayedColumns: (keyof SubscriberType)[] = [
    'Name',
    'JobTitle',
    'Area',
    'CountryName',
    'PhoneNumber',
    'action',
  ];

  constructor(private subscriberService: SubscriberService) {}

  ngOnInit() {
    const params: IPageParams = { criteria: 'Otro' };
    this.subscriberService.getAllSubscribers().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.Data);
    });
  }

  openUpdateDialog(id: number) {}

  openDeleteDialog(id: number) {}
}
