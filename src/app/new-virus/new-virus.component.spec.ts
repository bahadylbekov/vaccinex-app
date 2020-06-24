import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVirusComponent, NewVirusModalComponent } from './new-virus.component';
import { FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('NewVirusComponent', () => {
  let component: NewVirusComponent;
  let fixture: ComponentFixture<NewVirusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVirusComponent, NewVirusModalComponent ],
      imports: [
        MatDialogModule,
        FormControl,
        MatFormFieldModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
