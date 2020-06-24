import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

export interface ModalData {
  name: string;
  origin: string;
  file_url: string;
  file: any;
}

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

@Component({
  selector: 'new-genome-modal',
  templateUrl: 'new-genome-modal.component.html',
  styleUrls: ['./new-genome-modal.component.scss']
})
export class NewGenomeModalComponent {
  viruses = new FormControl();
  readonly maxSize = 104857600;

  virusesList: string[] = ['Coronavirus', 'MERS', 'SARS', 'HIV/AIDS'];
  formDoc: any;

  constructor(
    public dialogRef: MatDialogRef<NewGenomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _fb: FormBuilder,) {}

  onNoClick(): void {
    this.dialogRef.close();
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
