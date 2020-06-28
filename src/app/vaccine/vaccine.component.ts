import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Vaccine } from 'src/models';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {
  vaccine: Vaccine

  constructor(
    private api: ApiService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVaccine()
  }

  loadVaccine() {
    const id = this.router.url.split('/').slice(-1).pop()
    this.api.getVaccineByID$(id).subscribe(res => res != null ? this.vaccine = res : null, error => console.log(error))
  }

}
