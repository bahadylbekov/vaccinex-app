import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { Genome } from 'src/models';
import { ApiService } from '../api.service';
import { Time } from '@angular/common';
import { AuthService } from '../auth.service';
import { TezosWalletService } from 'src/services/tezos-wallet.service';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Router } from '@angular/router';
import * as ls from "local-storage";

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
  genomes: GenomeTableItem[];
  genomeList = new Array;
  created_by: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['genome_name', 'organization_name', 'virus_name', 'price', 'simularity_rate', 'origin', 'action'];

  async ngOnInit() {
    if (this.router.url === '/genomes') {
      await this.loadAllGenomes()
      await this.loadUserID()
    } else if (this.router.url === '/profile') {
      await this.loadMyGenomes()
      await this.loadUserID()
    } else if (this.router.url.split('/').slice()[1] === 'viruses') {
      const id = this.router.url.split('/').slice(-1).pop()
      await this.loadGenomesForVirus(id)
      await this.loadUserID()
    } else if (this.router.url.split('/').slice()[1] === 'organizations') {
      const id = this.router.url.split('/').slice(-1).pop()
      await this.loadGenomesForOrganization(id)
      await this.loadUserID()
    }
  }

  ngAfterViewInit() {
    
  }

  public async buyTokenHandler(creatureId: number, price: number) {
    
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.buy(creatureId, price).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(async hash => {
        await console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`)
      })
      .catch(error => console.log(error));
  }

  public async sellTokenHandler(creatureId: number, price: number) {
    
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.sell(creatureId, price).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(async hash => {
        await console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`)
      })
      .catch(error => console.log(error));
  }

  loadUserID() {
    this.api.getMyProfile$().subscribe(
      res => {
        if (res != null) {
          if (res[0] != null) {
            this.created_by = res[0].created_by
          }
        }
      }
    );
  }


  async buyToken(id: number, price: number) {
    var params = {
        creatureId: id,
        price: price,
    }
    this.buyTokenHandler(params.creatureId, params.price)
  }

  async sellToken(id: number, price: number) {
    var params = {
      creatureId: id,
      price: price,
    }
    this.sellTokenHandler(params.creatureId, params.price)
  }

  loadAllGenomes () {
    this.api.getGenomes$().subscribe(
      res => {
        this.genomes = res;
        if (res != null) {
          console.log(this.genomes)
          this.dataSource = new MatTableDataSource(this.genomes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;    
        }
      }
    );
  }

  loadMyGenomes() {
    this.api.getMyGenomes$().subscribe(
      res => {
        if (res != null) {
          console.log(this.genomes)
          this.dataSource = new MatTableDataSource(this.genomes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;    
        }
      }
    );
  }

  loadGenomesForVirus(id: string) {
    console.log('getting for virus')
    this.api.getGenomesByVirus$(id).subscribe(
      res => {
        if (res != null) {
          console.log(this.genomes)
          this.dataSource = new MatTableDataSource(this.genomes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;    
        }
      }
    );
  }

  loadGenomesForOrganization(id: string) {
    this.api.getGenomesByOrganization$(id).subscribe(
      res => {
        if (res != null) {
          console.log(this.genomes)
          this.dataSource = new MatTableDataSource(this.genomes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;    
        }
      }
    );
  }
}
