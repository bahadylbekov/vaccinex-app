import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import {MatTableDataSource} from '@angular/material/table';

export interface VaccinesTableItem {
  name: string;
  id: number;
  family: string;
  fatality_rate: string;
  origin: string;
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
  family: string = 'All';
  EXAMPLE_DATA: VaccinesTableItem[] = [
    {id: 1, name: 'SARS-CoV-2', family:'Coronaviridae', fatality_rate: '1.5%', origin: 'China'},
    {id: 2, name: 'HIV/AIDS', family: 'Retroviridae', fatality_rate: '1.21%', origin: 'Africa (Continent)'},
    {id: 3, name: 'Influenza', family: 'Retroviridae', fatality_rate: '1.21%', origin: 'Spain'},
    {id: 4, name: 'Hepatitis C', family: 'Flaviviridae', fatality_rate: '1.21%', origin: 'Europe (Continent)'},
    {id: 5, name: 'Astrovirus', family: 'Astroviridae', fatality_rate: '1.21%', origin: 'Worldwide'},
    {id: 5, name: 'Ebola virus', family: 'Filoviridae', fatality_rate: '1.21%', origin: 'Africa (Continent)'},
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'family', 'fatality_rate', 'origin'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.EXAMPLE_DATA);

    this.dataSource.filterPredicate = (data: VaccinesTableItem, filter: string) => data.family == this.family || this.family == 'All';

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  ngAfterViewInit() {
    
  }

  ChangeFamily(family: string) {
    console.log(family);
    this.family = family;
    console.log(this.family);
    this.dataSource.filter = family;
    
    
  }
    
}
