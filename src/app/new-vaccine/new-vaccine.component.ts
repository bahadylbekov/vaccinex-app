import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Vaccine } from 'src/models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-vaccine',
  templateUrl: './new-vaccine.component.html',
  styleUrls: ['./new-vaccine.component.scss']
})
export class NewVaccineComponent implements OnInit {
  is_active: boolean = true
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewVaccineModalComponent, {
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

export interface Virus {
  name: string;
  id: number;
}

@Component({
  selector: 'new-vaccine-modal',
  templateUrl: 'new-vaccine-modal.component.html',
  styleUrls: ['./new-vaccine-modal.component.scss']
})
export class NewVaccineModalComponent {
  virusesControl = new FormControl('', Validators.required);
  virusesList: Virus[] = [
    {name: 'Sars-Cov-2', id: 1},
    {name: 'Ebola', id: 2},
    {name: 'HIV/AIDS', id: 3},
  ];

  constructor(
    public dialogRef: MatDialogRef<NewVaccineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public vaccine: Vaccine,
    public api: ApiService,
    private _fb: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createNewVaccine(): Promise<any> {
    this.vaccine.is_active = true
    this.vaccine.funded_amount = '0'
    console.log(this.vaccine)
    await this.api.createVaccine$(this.vaccine).subscribe(res => window.location.reload(), error => console.log(error));
  }

  onChangeVirus(data: any): void {
    this.vaccine.virus_id = data.value.id
    this.vaccine.virus_name = data.value.name
  }

  ngOnInit() {
  }

}
