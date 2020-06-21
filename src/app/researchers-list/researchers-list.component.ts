import { Component, OnInit } from '@angular/core';

export interface Researcher {
  id: string;
  name: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-researchers-list',
  templateUrl: './researchers-list.component.html',
  styleUrls: ['./researchers-list.component.scss']
})

export class ResearchersListComponent implements OnInit {

  constructor() { }

  researchers: Researcher[] = [
    {id: 'nusvdni0w1', name: 'Alex Bolduin', city: 'San Francisco', country: 'USA'},
    {id: 'nusvdni0w2', name: 'Greg Bolduin', city: 'San Francisco', country: 'USA'},
    {id: 'nusvdni0w3', name: 'John Appleseed', city: 'San Francisco', country: 'USA'},
  ]
  ngOnInit(): void {
  }

}
