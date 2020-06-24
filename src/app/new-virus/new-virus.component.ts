import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Virus } from '../viruses/viruses.component';

export interface VirusModel {
  name: string;
  description: string;
  spread: string;
  family: string;
  fatality_rate: string;
}

@Component({
  selector: 'app-new-virus',
  templateUrl: './new-virus.component.html',
  styleUrls: ['./new-virus.component.scss']
})
export class NewVirusComponent implements OnInit {
  name: string;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewVirusModalComponent, {
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
    @Inject(MAT_DIALOG_DATA) public virus: VirusModel,
    private _fb: FormBuilder,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createNewVirus(): Promise<any> {
    await console.log(this.virus)
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
