import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Virus } from 'src/models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-virus',
  templateUrl: './new-virus.component.html',
  styleUrls: ['./new-virus.component.scss']
})
export class NewVirusComponent implements OnInit {
  is_active: boolean = true
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewVirusModalComponent, {
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

export interface Family {
  name: string;
  value: string;
}

export interface Spread {
  name: string;
  value: string;
}

@Component({
  selector: 'new-virus-modal',
  templateUrl: 'new-virus-modal.component.html',
  styleUrls: ['./new-virus-modal.component.scss']
})
export class NewVirusModalComponent {
  familyControl = new FormControl('', Validators.required);
  familiesList: Family[] = [
    {name: 'Adenoviruses', value: 'adenoviruses'},
    {name: 'Coronaviruses', value: 'coronaviruses'},
    {name: 'Herpesviruses', value: 'herpesviruses'},
    {name: 'Poxviruses', value: 'poxviruses'},
    {name: 'Retroviruses', value: 'retroviruses'},
  ];
  spreadControl = new FormControl('', Validators.required);
  spreadList: Spread[] = [
    {name: 'Local', value: 'local'},
    {name: 'Regional', value: 'regional'},
    {name: 'Global', value: 'global'},
  ];

  constructor(
    public dialogRef: MatDialogRef<NewVirusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public virus: Virus,
    public api: ApiService,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createNewVirus(): Promise<any> {
    this.virus.photo_url = 'https://duckduckgo.com/i/60f0472f.png'
    this.virus.is_active = true
    this.virus.is_vaccine = false
    await this.api.createVirus$(this.virus).subscribe(res => window.location.reload(), error => console.log(error));
  }

  onChangeSpread(data: any): void {
    this.virus.spread = data.value.value
  }

  onChangeFamily(data: any): void {
    this.virus.family = data.value.value
  }

  ngOnInit() {
  }

}
