import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGenomeComponent, NewGenomeModalComponent } from './new-genome.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

describe('NewGenomeComponent', () => {
  let component: NewGenomeComponent;
  let fixture: ComponentFixture<NewGenomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGenomeComponent, NewGenomeModalComponent ],
      imports: [
        MatDialogModule,
        FormControl,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGenomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
