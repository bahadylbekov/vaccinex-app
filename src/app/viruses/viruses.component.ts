import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Time } from '@angular/common';
import { ApiService } from '../api.service';

export interface Virus {
  id: string;
  name: string;
  description  :string;
  photoUrl     :string;
  family: string;
  fatalityRate :string
	spread       :string
	isActive     :boolean
	isVaccine    :boolean
	createdBy    :string
	createdAt    :Time
	updatedBy    :string
	updatedAt    :Time
}

@Component({
  selector: 'app-viruses',
  templateUrl: './viruses.component.html',
  styleUrls: ['./viruses.component.scss']
})
export class VirusesComponent implements OnInit {

  constructor(
    private api: ApiService,
  ) { }
  viruses: Virus[] = []

  ngOnInit(): void {
    this.loadViruses()
  }

  loadViruses () {
    this.api.getViruses$().subscribe(
      res => {
        this.viruses = res;
      }
    );
  }

}
