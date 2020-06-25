import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ApiService } from 'src/app/api.service';

export interface Organization {
  organizationID :number
	name           :string
	email          :string
	photoUrl       :string
	website        :string
	country        :string
	city           :string
	decription     :string
	specialization :string
	deals          :string
	genomesAmount  :string
	fundedAmount   :string
	isActive       :boolean
	createdBy      :string
	createdAt      :Time
	updatedBy      :string
  updatedAt      :Time
}

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  constructor(private api: ApiService) { }
  organizations: Organization[] = []

  ngOnInit(): void {
    this.loadOrganizations()
  }

  loadOrganizations () {
    this.api.getOrganizations$().subscribe(
      res => {
        this.organizations = res;
      }
    );
  }
}
