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
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateProfileModalComponent, {
      data: {is_active: this.is_active}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.is_active = result
    });
  }

  loadProfile() {
      this.api.getMyProfile$().subscribe(
        async res => {
          if (res != null) {
            if (res[0] != null) {
              console.log(res[0])
              this.profile = await res[0]
              await this.loadTezosAccounts()
              await this.getMyBalance()          
            }
          }
          else {
            this.openModal()
          }
        }
      );
  }

  createSmartContract() {
    this.tezos.originateContract()
  }

  async getMyBalance (): Promise<any> {
    const publicKeyHash = ls.get('publicKeyHash')
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' });
    Tezos.tz
      .getBalance(publicKeyHash.toString())
      .then(balance => {
        const result = balance.toNumber() / 1000000
        this.tezosAccount.balance = result
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
        if (res != null) {
          console.log(res)
          this.tezosAccount = res[0]  
        }
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
    @Inject(MAT_DIALOG_DATA) public new_profile: Profile,
    private api: ApiService,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createNewProfile(): Promise<any> {
    this.new_profile.specialization = await 'General viruses'
    this.new_profile.photo_url = await 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2F-MxCs26_b2no%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FTr7qbJ5zJhI%2Fs900-c-k-no-mo-rj-c0xffffff%2Fphoto.jpg&f=1&nofb=1'
    this.new_profile.website = await 'https://medicine.stanford.edu/'
    this.new_profile.deals = await '0'
    this.new_profile.genomes_amount = await '1'
    this.new_profile.funded_amount = await '0 $'
    this.new_profile.is_active = true
    console.log(this.new_profile)
    await this.api.createProfile$(this.new_profile).subscribe(
      res => {
        console.log(res)
        window.location.reload();
      }
    );
  }

  ngOnInit() {
  }

}
