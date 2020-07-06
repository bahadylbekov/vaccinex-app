import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNucypherAccountComponent, NewNucypherAccountModalComponent } from './new-nucypher-account.component';

import { FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('NewNucypherAccountComponent', () => {
  let component: NewNucypherAccountComponent;
  let fixture: ComponentFixture<NewNucypherAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNucypherAccountComponent, NewNucypherAccountModalComponent ],
      imports: [
        MatDialogModule,
        FormControl,
        MatFormFieldModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNucypherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
