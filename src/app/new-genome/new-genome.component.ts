import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Genome, EncryptionRequest, NucypherAccount, Policy, Receipt, Profile, RequestedGrant } from 'src/models';
import * as IPFS from 'ipfs-mini' 
import { ApiService } from '../api.service';
const Web3 = require('web3');
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../assets/contract.js';

@Component({
  selector: 'app-new-genome',
  templateUrl: './new-genome.component.html',
  styleUrls: ['./new-genome.component.scss']
})
export class NewGenomeComponent implements OnInit {
  name: string;
  ethereum_account: string;
  balance: any;

  constructor(public dialog: MatDialog) { }
  web3 = new Web3(Web3.givenProvider)
  contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  openDialog(): void {
    const dialogRef = this.dialog.open(NewGenomeModalComponent, {
      data: {
        ethereum_account: this.ethereum_account,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result
    });
  }

  ngOnInit(): void {
    this.isInstalled()
    this.isLocked()
    this.getAccounts()
  }

  isInstalled() {
    if (typeof this.web3 !== 'undefined'){
       console.log('MetaMask is installed')
    } 
    else{
       console.log('MetaMask is not installed')
    }
  }  

  isLocked() {
    this.web3.eth.getAccounts(function(err, accounts){
       if (err != null) {
          console.log(err)
       }
       else if (accounts.length === 0) {
          window['ethereum'].enable()
          console.log('MetaMask is locked')
       }
       else {
          console.log('MetaMask is unlocked')
       }
    });
  }

  async getBalance() {
    this.web3.eth.getBalance(this.ethereum_account, (err, balance) => {
      this.balance = this.web3.utils.fromWei(balance, "ether") + " ETH"
    });
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

}

interface Vaccine {
  vaccine_id: number;
  vaccine_name: string;
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

export class NewGenomeModalComponent implements OnInit {
  file_url: string = ''
  encryption_request = new EncryptionRequest;
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  
  async UploadToIpfs(data: any): Promise<any> {
    await this.ipfs.add(data)
      .then(result => {
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

  vaccinesControl = new FormControl('', Validators.required);
  vaccinesList: Vaccine[] = [
    {vaccine_name: 'COVID-19', vaccine_id: 1},
    {vaccine_name: 'Ebola Vaccine', vaccine_id: 2},
    {vaccine_name: 'HIV Vaccine', vaccine_id: 3},
  ];

  formDoc: any;
  ipfsLoading: boolean;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewGenomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public genome: Genome,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      username: '',
      password: '',
      account: '',
      label: '',
      file: null,  
    })
  }

  nucypher_account = new NucypherAccount;
  policy = new Policy;
  receipt = new Receipt;
  profile = new Profile;
  requested_grant = new RequestedGrant;
  web3 = new Web3(Web3.givenProvider)
  contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  onNoClick(): void {
    this.dialogRef.close();
  }

  async uploadFile($event): Promise<any> {

    var file = <File>$event.target.files[0];

    this.form.patchValue({
      file: file,
      username: this.nucypher_account.name,
      account: this.nucypher_account.address,
      label: file.name,
    });
    this.form.get('file').updateValueAndValidity()
    this.genome.is_active = true;
    this.genome.is_sold = false;
    this.genome.simularity_rate = '98%'
    this.genome.owner_account = this.nucypher_account.address
    this.genome.nucypher_account = this.nucypher_account.name
  }

  async submitForm() {
    this.ipfsLoading = await true
    var formData: any = new FormData();
    await formData.append("username", this.form.get('username').value);
    await formData.append("password", this.form.get('password').value);
    await formData.append("account", this.form.get('account').value);
    await formData.append("label", this.form.get('label').value);
    await formData.append("file", this.form.get('file').value);

    await this.api.uploadAndEncryptData$(formData).subscribe(async (res) => {
      console.log(res)
      this.policy = await res.policy_info
      this.genome.filename = await res.policy_info.label
      this.genome.file_url = await res.receipt.hash_key
      this.genome.organization_id = await this.profile.organization_id
      this.genome.organization_name = await this.profile.organization_name
      this.genome.file_url = await res.receipt.hash_key
      this.genome.ethereum_address = await this.data.ethereum_account
      this.receipt = await res.receipt
      await console.log(this.policy)
      await console.log(this.receipt)
      await this.api.createPolicy$(this.policy).subscribe(async (res) => {
        await console.log(res)
        this.genome.policy_id = await res.policy_id
      }, err => console.log(err))
      await this.api.createReceipt$(this.receipt).subscribe(async (res) => {
        await console.log(res)
        this.genome.receipt_id = await res.receipt_id
      }, err => console.log(err))
      this.genome.token_id = await this.randomInteger(0, 100000)
      await console.log(this.genome)
      await console.log(this.data.ethereum_account)
      await this.mintNewToken(this.data.ethereum_account, this.genome.token_id, this.genome.file_url)
      await this.api.createGenome$(this.genome).subscribe((res) => {
        window.location.reload()
        console.log(res)
      }, err => console.log(err))
      this.ipfsLoading = await true
    }, error => console.log(error))  
  }


  loadNucypherAccount() {
    this.api.getMyNucypherAccounts$().subscribe(async (res) => {
      if (res != null && res[0] != null) {
        this.nucypher_account = await res[0]
      }
    })
  }

  loadMyProfile() {
    this.api.getMyProfile$().subscribe(async (res) => {
      if (res != null && res[0] != null) {
        this.profile = await res[0]
      }
    })
  }

  randomInteger(min, max): number{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }


  onChangeVirus(data: any): void {
    this.genome.virus_name = data.value.value
  }

  onChangeVaccine(data: any): void {
    this.genome.vaccine_name = data.value.vaccine_name
    this.genome.vaccine_id = data.value.vaccine_id
  }

  async mintNewToken(address_to: string, token_id: number, token_uri: string) {
    await this.contract.methods.mint(address_to, token_id, token_uri).send({from: address_to })
      .then(result => {
          console.log(result)
      })
      .catch(error => console.log(error))
  }


  ngOnInit() {
    this.loadNucypherAccount()
    this.loadMyProfile()
    this.formDoc = this._fb.group({
      requiredfile: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ]
    });
  }

}
