import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Genome, RequestedGrant, NucypherAccount } from 'src/models';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GenomeTableDataSource } from './genome-table-datasource';
import Web3 from 'web3';

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.scss']
})
export class GenomeTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: GenomeTableDataSource;
  ethereum_account: string;
  web3 = new Web3(Web3.givenProvider)

  constructor(
    private api: ApiService,
    private router: Router,
    public auth: AuthService,
  ) { }
  empty_genomes: Genome[] = []
  created_by: string;
  nucypher_processing = false;
  requested_grant = new RequestedGrant;
  nucypher_account = new NucypherAccount;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['genome_name', 'organization_name', 'virus_name', 'price', 'vaccine_name', 'action'];

  async ngOnInit() {
    await this.loadUserID()
    await this.loadGenomes()
    await this.loadNucypherAccount()
    await this.getAccounts()
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
        console.log(res)
        this.createTable(res)
      });
    } else if (this.router.url.split('/').slice()[1] === 'organizations') {
      const id = this.router.url.split('/').slice(-1).pop()
      this.api.getGenomesByOrganization$(id).subscribe(res => {
        console.log(res)
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

  loadNucypherAccount() {
    this.api.getMyNucypherAccounts$().subscribe(async (res) => {
      if (res != null && res[0] != null) {
        this.nucypher_account = await res[0]
      }
    })
  }

  async getAccounts(): Promise<any> {
    await this.web3.eth.getAccounts(async (err, accs) => {   
      if (err != null || accs.length === 0) {
        return
      }
      this.ethereum_account = accs[0]
      return this.ethereum_account
    });
  }

  async requestGrant(row: Genome) {
    this.nucypher_processing = await true;
    this.requested_grant.token_id = await row.token_id
    this.requested_grant.alice_ethereum_account = await row.ethereum_address
    this.requested_grant.alice_nucypher_account_name = await row.nucypher_account
    this.requested_grant.alice_nucypher_account_address = await row.owner_account
    this.requested_grant.label = await row.filename
    this.requested_grant.hash_key = await row.file_url
    this.requested_grant.policy_id = await row.policy_id
    this.requested_grant.receipt_id = await row.receipt_id
    this.requested_grant.is_active = await true
    this.requested_grant.bob_nucypher_account_name = await this.nucypher_account.name
    this.requested_grant.bob_nucypher_account_address = await this.nucypher_account.address
    this.requested_grant.bob_ethereum_account = await this.ethereum_account
    await console.log(this.requested_grant)
    await this.api.createRequestedGrant$(this.requested_grant).subscribe((res) => {
      window.location.reload()
      this.nucypher_processing = false;
      console.log(res)
    }, err => console.log(err))
  }

  loadUserID() {
    this.api.getMyProfile$().subscribe(res => res != null && res[0] != null ? this.created_by = res[0].created_by : '');
  }
}
