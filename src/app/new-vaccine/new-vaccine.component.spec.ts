import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVaccineComponent, NewVaccineModalComponent } from './new-vaccine.component';
import { FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('NewVaccineComponent', () => {
  let component: NewVaccineComponent;
  let fixture: ComponentFixture<NewVaccineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVaccineComponent, NewVaccineModalComponent ],
      imports: [
        MatDialogModule,
        FormControl,
        MatFormFieldModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
