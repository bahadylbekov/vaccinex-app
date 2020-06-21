import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-virus',
  templateUrl: './virus.component.html',
  styleUrls: ['./virus.component.scss']
})
export class VirusComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
