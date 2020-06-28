import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Vaccine } from 'src/models';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent implements OnInit {

  constructor(
    private api: ApiService,
    public auth: AuthService,
  ) { }
  vaccines: Vaccine[] = []

  ngOnInit(): void {
    this.loadVaccines()
  }

  loadVaccines() {
    this.api.getVaccines$().subscribe(res => res != null ? this.vaccines = res : null, error => console.log(error));
  }

}
