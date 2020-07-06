import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Organization, NucypherAccount } from 'src/models';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organization = new Organization;
  nucypher_account = new NucypherAccount;

  constructor(public auth: AuthService, private api: ApiService, private router: Router) { }
  id = this.router.url.split('/').slice(-1).pop()

  async ngOnInit() {
    await this.loadOrganization(this.id)
    await this.loadNucypherAccount(this.id)
  }

  loadOrganization(id) {
    this.api.getOrganizationByID$(id).subscribe(res => res != null ? this.organization = res : null, error => console.log(error))
  }

  loadNucypherAccount(id) {
    this.api.getOrganizationNucypherAccounts$(id).subscribe(async (res) => {
      if (res != null && res[0] != null) {
        this.nucypher_account = await res[0]
      }
    })
  }

}
