import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Genome } from 'src/models';

@Component({
  selector: 'app-genomes',
  templateUrl: './genomes.component.html',
  styleUrls: ['./genomes.component.scss']
})
export class GenomesComponent implements OnInit {

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

}
