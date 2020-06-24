import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

export interface ModalData {
  name: string;
  email: string;
  password: string;
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

  constructor(
    public dialogRef: MatDialogRef<NewTezosAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _fb: FormBuilder,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
