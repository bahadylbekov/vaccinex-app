import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from 'src/app/api.service';
import { Profile, NucypherAccount } from '../../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = new Profile;
  nucypher_account = new NucypherAccount;
  is_active :boolean = true;

  constructor(
    public auth: AuthService, 
    private api: ApiService, 
    public dialog: MatDialog,

  ) { }

  async ngOnInit() {
    await this.loadProfile()
    await this.loadNucypherAccount()
  }

  openModal(): void {
    const dialogRef = this.dialog.open(CreateProfileModalComponent, {
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.is_active = result;
    });
  }

  loadProfile() {
      this.api.getMyProfile$().subscribe(
        async res => {
          if (res != null && res[0] != null) {
              this.profile = await res[0]
          }
          else {
            this.openModal()
          }
        }
      );
  }

  loadNucypherAccount() {
    this.api.getMyNucypherAccounts$().subscribe(async (res) => {
      if (res != null && res[0] != null) {
        this.nucypher_account = await res[0]
      }
    })
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
      private api: ApiService,
      private _fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: Profile
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    async createNewProfile(): Promise<any> {
      this.data.specialization = await 'General viruses'
      this.data.photo_url = await 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2F-MxCs26_b2no%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FTr7qbJ5zJhI%2Fs900-c-k-no-mo-rj-c0xffffff%2Fphoto.jpg&f=1&nofb=1'
      this.data.website = await 'https://medicine.stanford.edu/'
      this.data.deals = await '0'
      this.data.genomes_amount = await '1'
      this.data.funded_amount = await '0 $'
      this.data.is_active = true
      console.log(this.data)
      await this.api.createProfile$(this.data).subscribe(res => window.location.reload());
    }  
}
  