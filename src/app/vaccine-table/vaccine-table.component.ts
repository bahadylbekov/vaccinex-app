import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VaccineTableDataSource } from './vaccine-table-datasource';
import { Vaccine } from 'src/models';

@Component({
  selector: 'app-vaccine-table',
  templateUrl: './vaccine-table.component.html',
  styleUrls: ['./vaccine-table.component.scss']
})
export class VaccineTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: VaccineTableDataSource;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }
  empty_vaccines: Vaccine[] = []
  created_by: string;

  displayedColumns = ['vaccine_name', 'virus_name', 'requested_amount', 'funded_amount'];

  async ngOnInit() {
    await this.loadUserID()
    await this.loadVaccines()
  }

  loadVaccines() {
    if (this.router.url.split('/').slice()[1] === 'viruses') {
        const id = this.router.url.split('/').slice(-1).pop()
        this.api.getVaccineByVirus$(id).subscribe(res => {
        this.createTable(res)
      });  
    }
  }

  createTable(vaccines: any) {
    vaccines != null ? this.dataSource = new VaccineTableDataSource(vaccines, this.paginator, this.sort) : this.loadEmptyTable()
  }

  loadEmptyTable() {
    this.dataSource = new VaccineTableDataSource(this.empty_vaccines, this.paginator, this.sort)
  }

  loadUserID() {
    this.api.getMyProfile$().subscribe(res => res != null && res[0] != null ? this.created_by = res[0].created_by : '');
  }

}
