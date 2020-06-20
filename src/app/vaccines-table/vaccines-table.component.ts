import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import {MatTableDataSource} from '@angular/material/table';

export interface VaccinesTableItem {
  name: string;
  id: number;
  lastUpdate: Date;
  application: string;
  category: string;
  remainingTime: string;
  status: string
}


@Component({
  selector: 'app-vaccines-table',
  templateUrl: './vaccines-table.component.html',
  styleUrls: ['./vaccines-table.component.scss']
})
export class VaccinesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  dataSource: MatTableDataSource<VaccinesTableItem>;
  status: string = 'All';
  EXAMPLE_DATA: VaccinesTableItem[] = [
    {id: 1, name: 'Hydrogen', lastUpdate: new Date('1968-11-16T00:00:00'), application: 'British Citizenship', category:'Cover Letter', remainingTime:'33 hours 50 min', status: 'Processing'},
    {id: 2, name: 'Helium', lastUpdate: new Date('1968-11-17T00:00:00'), application: 'British Citizenship', category:'Full Service', remainingTime:'33 hours 50 min', status: 'Completed'},
    {id: 3, name: 'Lithium', lastUpdate: new Date('1968-11-18T00:00:00'), application: 'British Citizenship', category:'Full Service', remainingTime:'33 hours 50 min', status: 'Completed'},
    {id: 4, name: 'Beryllium', lastUpdate: new Date('1968-11-19T00:00:00'), application: 'ILR', category:'Full Service', remainingTime:'33 hours 50 min', status: 'Completed'},
    {id: 5, name: 'Boron', lastUpdate: new Date('1968-11-20T00:00:00'), application: 'ILR', category:'Cover Letter', remainingTime:'33 hours 50 min', status: 'Completed'},
  
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'lastUpdate', 'application', 'category', 'remainingTime', 'status'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.EXAMPLE_DATA);

    this.dataSource.filterPredicate = (data: VaccinesTableItem, filter: string) => data.status == this.status || this.status == 'All';

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  ngAfterViewInit() {
    
  }

  ChangeStatus(status: string) {
    console.log(status);
    this.status = status;
    console.log(this.status);
    this.dataSource.filter = status;
    
    
  }
    
}
