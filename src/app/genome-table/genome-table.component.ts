import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { Genome } from 'src/models';
import { ApiService } from '../api.service';
import { Time } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface GenomeTableItem {
  genome_id: number;
  genome_name: string;
  organization_name: string;
  file_url: string;
  virus_name: string;
  simularity_rate: string;
  origin: string;
  status: string;
  is_active         :boolean 
  is_sold           :boolean
  created_by        :string
  created_at        :Time
}

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.scss']
})
export class GenomeTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    public auth: AuthService,
  ) { }
  
  dataSource: MatTableDataSource<GenomeTableItem>;
  // status: string = 'All';
  genomes: GenomeTableItem[]
  genomeList = new Array

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['genome_name', 'organization_name', 'virus_name', 'simularity_rate', 'origin'];

  async ngOnInit() {
    if (this.router.url === '/genomes') {
      await this.loadAllGenomes()
    } else if (this.router.url === '/profile') {
      await this.loadMyGenomes()
    } else if (this.router.url.split('/').slice()[1] === 'viruses') {
      const id = this.router.url.split('/').slice(-1).pop()
      await this.loadGenomesForVirus(id)
    } else if (this.router.url.split('/').slice()[1] === 'organizations') {
      const id = this.router.url.split('/').slice(-1).pop()
      await this.loadGenomesForOrganization(id)
    }
  }

  ngAfterViewInit() {
    
  }

  loadAllGenomes () {
    this.api.getGenomes$().subscribe(
      res => {
        this.genomes = res;
        console.log(this.genomes)
        this.dataSource = new MatTableDataSource(this.genomes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    );
  }

  loadMyGenomes() {
    this.api.getMyGenomes$().subscribe(
      res => {
        this.genomes = res;
        this.dataSource = new MatTableDataSource(this.genomes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    );
  }

  loadGenomesForVirus(id: string) {
    console.log('getting for virus')
    this.api.getGenomesByVirus$(id).subscribe(
      res => {
        this.genomes = res;
        this.dataSource = new MatTableDataSource(this.genomes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    );
  }

  loadGenomesForOrganization(id: string) {
    this.api.getGenomesByOrganization$(id).subscribe(
      res => {
        this.genomes = res;
        this.dataSource = new MatTableDataSource(this.genomes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    );
  }
}
