import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { TezosAccount } from 'src/models';
import { ApiService } from '../api.service';
import { TezosWalletService } from 'src/services/tezos-wallet.service';
import * as ls from "local-storage";

export interface TezozKeyValue {
  email: string;
  password: string;
  mnemonic: Array<string>;
  name: string;
  organization_id: string;
  address: string;
  balance: string;
  tokens: string;
  is_active         :boolean
  is_private           :boolean
}

export class FaucetKey {
  email: string;
  password: string;
  mnemonic: Array<string>;
}

@Component({
  selector: 'app-new-tezos-account',
  templateUrl: './new-tezos-account.component.html',
  styleUrls: ['./new-tezos-account.component.scss']
})
export class NewTezosAccountComponent implements OnInit {
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTezosAccountModalComponent, {
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

@Component({
  selector: 'new-tezos-account-modal',
  templateUrl: 'new-tezos-account-modal.component.html',
  styleUrls: ['./new-tezos-account-modal.component.scss']
})
export class NewTezosAccountModalComponent {
  organization_id: string;
  account = new TezosAccount;
  faucetKey = new FaucetKey;
  mnemonicGenerated: boolean;
  mnemonicPhrase: any;

  constructor(
    public dialogRef: MatDialogRef<NewTezosAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public secrets: TezozKeyValue,
    public api: ApiService,
    public tezos: TezosWalletService,
    private _fb: FormBuilder,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createTezosAccount(): Promise<any> {
    this.account.organization_id = this.organization_id
    this.account.tokens = '0'
    this.account.balance = '0'
    this.account.is_active = true
    this.account.is_private = false
    this.faucetKey.email = this.secrets.email
    this.faucetKey.password = this.secrets.email
    const mnemonic = await this.tezos.generateFaucetKey(this.faucetKey)
    this.mnemonicGenerated = await true;
    this.mnemonicPhrase = await mnemonic
    this.account.address  = ls.get('publicKeyHash')
    console.log(this.account)
    await this.api.createTezosAccount$(this.account).subscribe(
      res => {
        console.log(res)
        window.location.reload();
      }
    );
  }

  ngOnInit() {
    this.loadOrgID()
  }

  loadOrgID() {
    this.api.getMyProfile$().subscribe(res => res != null && res[0] != null ? this.organization_id = res[0].organization_id : '');
  }

}
