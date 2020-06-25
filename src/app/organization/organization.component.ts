import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Organization } from 'src/models';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organization = new Organization

  constructor(public auth: AuthService, private api: ApiService, private router: Router) { }

  async ngOnInit() {
    await this.loadOrganization()
  }

  loadOrganization() {
    const id = this.router.url.split('/').slice(-1).pop()
    this.api.getOrganizationByID$(id).subscribe(
      res => {
        this.organization = res
      }, error => console.log(error))
  }

}
