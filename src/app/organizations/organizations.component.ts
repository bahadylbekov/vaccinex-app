import { Component, OnInit } from '@angular/core';

export interface Organization {
  id: string;
  name: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  constructor() { }
  organizations: Organization[] = [
    {id: 'nusvdni0w1', name: 'Stanford Medical Research', city: 'San Francisco', country: 'USA'},
    {id: 'nusvdni0w2', name: 'UC Berkeley Medical Institute', city: 'Berkeley', country: 'USA'},
    {id: 'nusvdni0w3', name: 'Yale Health', city: 'New Haven', country: 'USA'},
  ]

  ngOnInit(): void {
  }

}
