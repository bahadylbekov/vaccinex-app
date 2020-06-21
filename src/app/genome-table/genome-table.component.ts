import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

export interface GenomeTableItem {
  name: string;
  id: number;
  family: string;
  fatality_rate: string;
  origin: string;
  status: string;
}

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.scss']
})
export class GenomeTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  dataSource: MatTableDataSource<GenomeTableItem>;
  status: string = 'All';
  EXAMPLE_DATA: GenomeTableItem[] = [
    {id: 1, name: 'SARS-CoV-2', family:'Coronaviridae', fatality_rate: '1.5%', origin: 'China', status: 'Sold'},
    {id: 2, name: 'HIV/AIDS', family: 'Retroviridae', fatality_rate: '1.21%', origin: 'Africa (Continent)', status: 'New'},
    {id: 3, name: 'Influenza', family: 'Retroviridae', fatality_rate: '1.21%', origin: 'Spain', status: 'New'},
    {id: 4, name: 'Hepatitis C', family: 'Flaviviridae', fatality_rate: '1.21%', origin: 'Europe (Continent)', status: 'Sold'},
    {id: 5, name: 'Astrovirus', family: 'Astroviridae', fatality_rate: '1.21%', origin: 'Worldwide', status: 'New'},
    {id: 5, name: 'Ebola virus', family: 'Filoviridae', fatality_rate: '1.21%', origin: 'Africa (Continent)', status: 'Sold'},
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'family', 'fatality_rate', 'origin', 'status'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.EXAMPLE_DATA);

    this.dataSource.filterPredicate = (data: GenomeTableItem, filter: string) => data.status == this.status || this.status == 'All';

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
