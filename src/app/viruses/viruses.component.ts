import { Component, OnInit } from '@angular/core';

export interface Virus {
  id: string;
  name: string;
  family: string;
}

@Component({
  selector: 'app-viruses',
  templateUrl: './viruses.component.html',
  styleUrls: ['./viruses.component.scss']
})
export class VirusesComponent implements OnInit {

  constructor() { }
  viruses: Virus[] = [
    {id: 'nusvdni0w1', name: 'SARS-CoV-2', family:'Coronaviridae'},
    {id: 'nusvdni0w9', name: 'HIV/AIDS', family: 'Retroviridae'},
    {id: 'nusvdni0w7', name: 'Influenza', family: 'Retroviridae',},
    {id: 'nusvdni0w6', name: 'Hepatitis C', family: 'Flaviviridae',},
    {id: 'nusvdni0w5', name: 'Astrovirus', family: 'Astroviridae',},
    {id: 'nusvdni0w4', name: 'Ebola virus', family: 'Filoviridae',}
  ]

  ngOnInit(): void {
  }

}
