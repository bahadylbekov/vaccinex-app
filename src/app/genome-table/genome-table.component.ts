import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Genome } from 'src/models';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GenomeTableDataSource } from './genome-table-datasource';

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.scss']
})
export class GenomeTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: GenomeTableDataSource;

  constructor(
    private api: ApiService,
    private router: Router,
    public auth: AuthService,
  ) { }
  empty_genomes: Genome[] = []
  created_by: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['genome_name', 'organization_name', 'virus_name', 'price', 'simularity_rate', 'origin', 'action'];

  async ngOnInit() {
    await this.loadUserID()
    await this.loadGenomes()
  }

  ngAfterViewInit() {}

  loadGenomes() {
    if (this.router.url === '/genomes') {
      this.api.getGenomes$().subscribe(res => { 
          this.createTable(res)
      });
    } else if (this.router.url === '/profile') {
      this.api.getMyGenomes$().subscribe(res => { 
        this.createTable(res)
      });  
    } else if (this.router.url.split('/').slice()[1] === 'vaccines') {
      const id = this.router.url.split('/').slice(-1).pop()
      this.api.getGenomesByVaccine$(id).subscribe(res => {
        this.createTable(res)
      });
    } else if (this.router.url.split('/').slice()[1] === 'organizations') {
      const id = this.router.url.split('/').slice(-1).pop()
      this.api.getGenomesByOrganization$(id).subscribe(res => {
        this.createTable(res)
      });
    }
  }

  createTable(genomes: any) {
    genomes != null ? this.dataSource = new GenomeTableDataSource(genomes, this.paginator, this.sort) : this.loadEmptyTable()
  }

  loadEmptyTable() {
    this.dataSource = new GenomeTableDataSource(this.empty_genomes, this.paginator, this.sort)
  }

  loadUserID() {
    this.api.getMyProfile$().subscribe(res => res != null && res[0] != null ? this.created_by = res[0].created_by : '');
  }
}
