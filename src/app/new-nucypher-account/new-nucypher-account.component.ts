import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NucypherCharacter, NucypherAccount } from 'src/models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-nucypher-account',
  templateUrl: './new-nucypher-account.component.html',
  styleUrls: ['./new-nucypher-account.component.scss']
})
export class NewNucypherAccountComponent implements OnInit {
  is_active: boolean = true
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNucypherAccountModalComponent, {
      data: {is_active: this.is_active}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.is_active = result
    });
  }

  ngOnInit(): void {
  }

}

interface NucypherKeys {
  enc_pubkey: string;
  sig_pubkey: string;
}

class AccountUsername {
  username: string;
}

@Component({
  selector: 'new-nucypher-account-modal',
  templateUrl: 'new-nucypher-account-modal.component.html',
  styleUrls: ['./new-nucypher-account-modal.component.scss']
})
export class NewNucypherAccountModalComponent implements OnInit {
  nucypher_public_keys: NucypherKeys = {
    enc_pubkey: '',
    sig_pubkey: '',
  };
  character_username = new AccountUsername;
  nucypher_account = new NucypherAccount;
  organization_id: number;
  acccount_loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewNucypherAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public character: NucypherCharacter,
    public api: ApiService,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadOrganizationID() {
    this.api.getMyProfile$().subscribe(res => res != null && res[0] != null ? this.organization_id = res[0].organization_id : 0);
  }

  async createNewAccount(): Promise<any> {
    this.acccount_loading = await true;
    await this.api.createNucypherAlice$(this.character).subscribe(async (res) => {
      this.nucypher_account.address = await res.address
      this.character_username.username = await this.character.username;
      await this.api.revealPublicKeys$(this.character_username).subscribe(async (result) => {
        this.nucypher_public_keys.enc_pubkey = await result.enc_pubkey;
        this.nucypher_public_keys.sig_pubkey = await result.sig_pubkey;
        await console.log(this.character_username)
        this.nucypher_account.organization_id = await this.organization_id
        this.nucypher_account.name = await this.character.username
        this.nucypher_account.encrypting_key = await this.nucypher_public_keys.enc_pubkey
        this.nucypher_account.signing_key = await this.nucypher_public_keys.sig_pubkey
        this.nucypher_account.balance = await 0
        this.nucypher_account.tokens = await 0
        await console.log(this.nucypher_account)
        await this.api.createNucypherAccount$(this.nucypher_account).subscribe((res) => console.log(res), error => console.log(error))    
        this.acccount_loading = await false;
      });
    }, error => console.log(error));
  }

  async ngOnInit() {
    await this.loadOrganizationID()
  }

}
