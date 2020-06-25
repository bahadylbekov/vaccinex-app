import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Genome } from 'src/models';
import * as IPFS from 'ipfs-mini' 
import { ApiService } from '../api.service';
import { TezosWalletService } from 'src/services/tezos-wallet.service';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import * as ls from "local-storage";


@Component({
  selector: 'app-new-genome',
  templateUrl: './new-genome.component.html',
  styleUrls: ['./new-genome.component.scss']
})
export class NewGenomeComponent implements OnInit {
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewGenomeModalComponent, {
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result
    });
  }

  ngOnInit(): void {
  }

}


export interface Viruses {
  name: string;
  value: string;
}

@Component({
  selector: 'new-genome-modal',
  templateUrl: 'new-genome-modal.component.html',
  styleUrls: ['./new-genome-modal.component.scss'],
})

export class NewGenomeModalComponent {
  file_url: string = ''
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
  async UploadToIpfs(data: any): Promise<any> {
    await this.ipfs.add(data)
      .then(result => {
        console.log(result)
        this.file_url = 'https://ipfs.infura.io/ipfs/' + result
        return result
      })
      .catch(error => console.log(error));
  }

  readonly maxSize = 104857600;
  virusesControl = new FormControl('', Validators.required);
  virusesList: Viruses[] = [
    {name: 'Coronavirus', value: 'Sars-Cov-2'},
    {name: 'MERS', value: 'MERS'},
    {name: 'SARS', value: 'SARS'},
    {name: 'HIV/AIDS', value: 'HIV/AIDS'},
  ];

  formDoc: any;
  ipfsLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewGenomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public genome: Genome,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService,
    private _fb: FormBuilder,
    public tezos: TezosWalletService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async uploadFile($event): Promise<any> {
    var file = $event.target.files[0];
    var reader = new FileReader();
    reader.onload = async () => {
      this.ipfsLoading = await true;
      const ipfsHash = await this.UploadToIpfs(reader.result)
      this.ipfsLoading = await false;
      return
    };
    reader.readAsText(file);
  }

  async createNewGenome(organization: string): Promise<any> {
    // this.genome.organization_name = ''
    this.genome.is_active = true;
    this.genome.is_sold = false;
    this.genome.simularity_rate = '98%'
    this.genome.file_url = this.file_url
    console.log(this.genome)
    await this.newToken();
  }

  randomInteger(min, max): number{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  public async createTokenUsingContract(auction: any, creatureId: any, isNew: any, owner: any, price: any, tokenURI: any) {
    
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer: await InMemorySigner.fromSecretKey(ls.get('secretKey')) });
    return Tezos.contract.at('KT1ErwjDBhhYnq6w5Qky9kVewvMye1HsP9z5')
      .then(contract => {
        return contract.methods.build(auction, creatureId, isNew, owner, price, tokenURI).send();
      })
      .then(op => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then(async hash => {
        await console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`)
        await this.api.createGenome$(this.genome).subscribe(
          res => {
            console.log(res)
            window.location.reload();
          }
        );    
      })
      .catch(error => console.log(error));
  }

  async newToken() {
    const tokenId = this.randomInteger(0, 10000)
    var params = {
        auction: 1593112528,
        creatureId: tokenId,
        isNew: true,
        owner: ls.get('publicKeyHash'),
        price: this.genome.price,
        tokenURI: this.genome.file_url,  
    }
    console.log(params)
    this.createTokenUsingContract(params.auction, params.creatureId, params.isNew, params.owner, params.price, params.tokenURI)
  }

  onChangeVirus(data: any): void {
    this.genome.virus_name = data.value.value
  }

  ngOnInit() {
    this.formDoc = this._fb.group({
      requiredfile: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ]
    });
  }

}
