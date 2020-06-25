import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Virus } from 'src/models';

@Component({
  selector: 'app-virus',
  templateUrl: './virus.component.html',
  styleUrls: ['./virus.component.scss']
})
export class VirusComponent implements OnInit {
  virus = new Virus

  constructor(public auth: AuthService, private api: ApiService, private router: Router) { }

  async ngOnInit() {
    await this.loadVirus()
  }

  loadVirus() {
    const id = this.router.url.split('/').slice(-1).pop()
    this.api.getVirusByID$(id).subscribe(
      res => {
        let newVirus = new Virus;
        newVirus = res
        this.virus = newVirus
      }, error => console.log(error))
  }

}
