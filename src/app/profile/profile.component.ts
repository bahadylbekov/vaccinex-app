import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from 'src/app/api.service';
import { Tezos, TezosToolkit } from '@taquito/taquito';
import { Profile, TezosAccount } from '../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { TezosWalletService } from 'src/services/tezos-wallet.service';
import * as ls from "local-storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = new Profile
  tezosAccount = new TezosAccount
  is_active :boolean = true;

  constructor(
    public auth: AuthService, 
    private api: ApiService, 
    public dialog: MatDialog,
    public tezos: TezosWalletService,
  ) { }

  async ngOnInit() {
    await this.loadProfile()
    await this.loadMyGenomes()
    await this.loadTezosAccounts()
    await this.getMyBalance()
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateProfileModalComponent, {
      data: {is_active: this.is_active}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.is_active = result
    });
  }

  loadMyGenomes () {
    this.api.getMyGenomes$().subscribe(
      res => console.log(res)
    );
  }

  loadProfile() {
      this.api.getMyProfile$().subscribe(
        res => {
          if (res != null) {
            if (res[0] != null) {
              console.log(res[0])
              this.profile = res[0]
            }
          }
          else {
            this.openModal()
          }
        }
      );
  }

  async getMyBalance (): Promise<any> {
    const publicKeyHash = ls.get('publicKeyHash')
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' });
    Tezos.tz
      .getBalance(publicKeyHash.toString())
      .then(balance => {
        this.tezosAccount.balance = balance.toNumber() / 1000000
        return
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        return
      });
  }

  loadTezosAccounts() {
    this.api.getMyTezosAccounts$().subscribe(
      res => {
        console.log(res)
        this.tezosAccount = res[0]
      }
    );
  }
}

@Component({
  selector: 'create-profile-modal',
  templateUrl: 'create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss']
})
export class CreateProfileModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private api: ApiService,
    private _fb: FormBuilder,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createNewProfile(): Promise<any> {
    this.data.specialization = await 'General viruses'
    this.data.photo_url = await 'https://images.unsplash.com/photo-1591808369997-f7c3ce5e0d0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    this.data.website = await 'https://medicine.yale.edu/'
    this.data.deals = await '0'
    this.data.genomes_amount = await '0'
    this.data.funded_amount = await '0 $'
    this.data.is_active = true
    console.log(this.data)
    await this.api.createProfile$(this.data).subscribe(
      res => {
        console.log(res)
        window.location.reload();
      }
    );
  }

  ngOnInit() {
  }

}
