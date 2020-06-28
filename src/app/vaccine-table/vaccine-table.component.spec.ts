import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTableComponent } from './vaccine-table.component';

describe('VaccineTableComponent', () => {
  let component: VaccineTableComponent;
  let fixture: ComponentFixture<VaccineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
