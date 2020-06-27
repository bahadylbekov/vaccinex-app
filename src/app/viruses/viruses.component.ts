import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Time } from '@angular/common';
import { ApiService } from '../api.service';
import { Virus } from 'src/models';


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
    this.api.getViruses$().subscribe(res => res != null ? this.viruses = res : null, error => console.log(error));
  }

}
